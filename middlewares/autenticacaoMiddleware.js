function autenticacaoMiddleware(req, res, next) {
  if (!req.session.name) {
    return res.redirect('/login');
  }

  next();
}

module.exports = autenticacaoMiddleware;
