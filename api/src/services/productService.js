const Product = require('../models/Product');
const { NotFoundError } = require('../lib/errors');

class ProductService {
  async getAll() {
    return await Product.findAll();
  }

  async getById(id) {
    const product = await Product.findByPk(id);
    if (!product) throw new NotFoundError('Produto não encontrado');
    return product;
  }

  async create(data) {
    // Melhorar a validação do produto.
    return await Product.create(data);
  }

  async update(id, data) {
    const product = await this.getById(id);
    await product.update(data);
    return product;
  }

  async delete(id) {
    const product = await this.getById(id);
    await product.destroy();
    return { message: 'Produto removido' };
  }
}

module.exports = new ProductService();
