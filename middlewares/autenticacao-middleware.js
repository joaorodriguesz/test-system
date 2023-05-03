function autenticacaoMiddleware(req, res, next) {
  if (!global.token) {
    return res.redirect('/login');
  }
  next();
}

module.exports = autenticacaoMiddleware;
