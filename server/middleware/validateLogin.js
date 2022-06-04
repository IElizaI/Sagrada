function validateLogin(req, res, next) {
  if (!req.body.password || !req.body.email) {
    res.status(400).send({ error: 'Пожалуйста, заполните все данные!' });
    return;
  }
  next();
}

module.exports = validateLogin;
