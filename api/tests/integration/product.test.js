const request = require('supertest');
const app = require('../../src/server');
const sequelize = require('../../src/config/sequelize');

// Recria as tabelas antes de todos os testes
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Fecha a conexão após todos os testes
afterAll(async () => {
  await sequelize.close();
});

describe('Product API — Integração', () => {
  let productId;

  test('POST /api/v1/products - deve criar um produto', async () => {
    const newProduct = {
      name: 'Camiseta',
      price: 39.9,
      description: 'Azul',
      stock: 5,
    };
    const response = await request(app)
      .post('/api/v1/products')
      .send(newProduct)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Camiseta');
    productId = response.body.id;
  });

  test('GET /api/v1/products - deve listar produtos', async () => {
    const response = await request(app).get('/api/v1/products').expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  test('GET /api/v1/products/:id - deve retornar um produto específico', async () => {
    const response = await request(app)
      .get(`/api/v1/products/${productId}`)
      .expect(200);
    expect(response.body.id).toBe(productId);
  });

  test('PUT /api/v1/products/:id - deve atualizar o produto', async () => {
    const update = { name: 'Camisa Preta', price: 49.9 };
    const response = await request(app)
      .put(`/api/v1/products/${productId}`)
      .send(update)
      .expect(200);
    expect(response.body.name).toBe('Camisa Preta');
    expect(response.body.price).toBe(49.9);
  });

  test('DELETE /api/v1/products/:id - deve remover o produto', async () => {
    await request(app).delete(`/api/v1/products/${productId}`).expect(200);
    await request(app).get(`/api/v1/products/${productId}`).expect(404);
  });
});
