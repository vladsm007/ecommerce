module.exports = (err, req, res, next) => {
  console.error({
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  const isDevelopment = process.env.NODE_ENV === 'development';

  // Status code padrão
  let statusCode = err.statusCode || 500;
  let message = isDevelopment ? err.message : 'Erro interno do sercidor';

  // Tratamento por tipo de erro
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Não autenticado';
  }

  res.status(statusCode).json({
    error: message,
    ...err(isDevelopment && { stack: err.stack }),
  });
};
