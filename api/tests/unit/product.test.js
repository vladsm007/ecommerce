const { NotFoundError } = require('../../src/lib/errors');
const productService = require('../../src/services/productService');
const Product = require('../../src/models/Product');

// Isola o model do banco de dados — testa apenas a lógica do service
jest.mock('../../src/models/Product');

describe('NotFoundError', () => {
  test('deve ser uma instância de Error', () => {
    const err = new NotFoundError('não encontrado');
    expect(err).toBeInstanceOf(Error);
  });

  test('deve ter o nome correto', () => {
    const err = new NotFoundError('não encontrado');
    expect(err.name).toBe('NotFoundError');
  });

  test('deve propagar a mensagem corretamente', () => {
    const err = new NotFoundError('Produto não encontrado');
    expect(err.message).toBe('Produto não encontrado');
  });
});

describe('ProductService — unitário', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAll() deve retornar a lista de produtos', async () => {
    const mockProducts = [{ id: 1, name: 'Camiseta' }];
    Product.findAll.mockResolvedValue(mockProducts);

    const result = await productService.getAll();

    expect(Product.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
  });

  test('getById() deve retornar um produto quando encontrado', async () => {
    const mockProduct = { id: 1, name: 'Camiseta' };
    Product.findByPk.mockResolvedValue(mockProduct);

    const result = await productService.getById(1);

    expect(Product.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockProduct);
  });

  test('getById() deve lançar NotFoundError quando produto não existe', async () => {
    Product.findByPk.mockResolvedValue(null);

    await expect(productService.getById(999)).rejects.toThrow(NotFoundError);
    await expect(productService.getById(999)).rejects.toThrow(
      'Produto não encontrado'
    );
  });

  test('create() deve chamar Product.create com os dados corretos', async () => {
    const data = { name: 'Tênis', price: 199.9, stock: 10 };
    const mockCreated = { id: 2, ...data };
    Product.create.mockResolvedValue(mockCreated);

    const result = await productService.create(data);

    expect(Product.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockCreated);
  });

  test('delete() deve lançar NotFoundError se produto não existe', async () => {
    Product.findByPk.mockResolvedValue(null);

    await expect(productService.delete(999)).rejects.toThrow(NotFoundError);
  });
});
