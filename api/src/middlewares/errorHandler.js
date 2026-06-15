// Evita que a aplicação caia com erros não tratados
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
};
