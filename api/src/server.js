require('dotenv').config();

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes.js');
const errorHandler = require('./middlewares/errorHandler.js');
const sequelize = require('./config/sequelize.js');

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/v1/products', productRoutes);
app.use(errorHandler);

// Só inicia o servidor se NÃO estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Banco conectado e sincronizado');
      app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => console.error('Erro ao conectar banco de dados:', err));
}

module.exports = app;
