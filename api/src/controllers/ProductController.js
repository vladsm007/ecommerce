const productService = require('../services/productService');
const Joi = require('joi');

// Schema de validação
const productSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    'string.empty': 'Nome é obrigatório.',
    'string.min': 'Nome deve ter no mínimo 3 caracteres.',
    'string.max': 'Nome não pode exceder 255 caracteres',
  }),
  price: Joi.number().precision(2).positive().required().messages({
    'number.base': 'Preço deve ser um número',
    'number.positive': 'Preço deve ser maior que 0',
  }),
  descripyion: Joi.string().max(5000).optional().allow(''),
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': 'Estoque deve ser um número inteiro.',
    'number.min': 'Estoque não pode ser negativo',
  }),
});

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
      // Validar input
      const { error, value } = productSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const messages = error.details.map((d) => d.message).join('; ');
        return res.status(400).json({
          error: 'Validação falhou',
          details: messages,
        });
      }
      const product = await productService.create(value);
      return res.status(201).json(product);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({
        error: 'Erro ao criar produto',
      });
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
