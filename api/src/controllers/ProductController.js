const productService = require('../services/productService');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAll();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getById(req.params.id);
      return res.json(product);
    } catch (error) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
  async createProduct(req, res) {
    try {
      const product = await productService.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      return res.json(product);
    } catch (error) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const result = await productService.delete(req.params.id);
      return res.json(result);
    } catch (error) {
      if (error.message === 'Produto não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
