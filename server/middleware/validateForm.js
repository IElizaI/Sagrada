function validateForm(req, res, next) {
  if (!req.body.email || !req.body.password || !req.body.login) {
    res.status(400).send({ error: 'Пожалуйста, заполните все данные!' });
    return;
  }
  next();
}

module.exports = validateForm;
