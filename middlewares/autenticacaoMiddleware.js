function autenticacaoMiddleware(req, res, next) {
  console.log(req.session);

  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
}

module.exports = autenticacaoMiddleware;
