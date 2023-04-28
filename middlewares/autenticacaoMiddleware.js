function autenticacaoMiddleware(req, res, next) {
  console.log(global.tokenAuth);

  if (!global.tokenAuth) {
    return res.redirect('/login');
  }

  next();
}

module.exports = autenticacaoMiddleware;
