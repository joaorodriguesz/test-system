function autenticacaoMiddleware(req, res, next) {
  console.log(req.session.name );
  if (!req.session.name) {
    return res.redirect('/login');
  }

  next();
}

module.exports = autenticacaoMiddleware;
