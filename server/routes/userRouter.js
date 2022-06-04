const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { Player } = require('../db/models');
const validateForm = require('../middleware/validateForm');
const validateLogin = require('../middleware/validateLogin');

userRouter.get('/register', (req, res) => {
  res.send('Register');
});

userRouter.post('/register', validateForm, async (req, res) => {
  try {
    const { login, email, password } = req.body;
    const user = await Player.findOne({
      where: { email },
    });

    if (user) {
      res.status(400).send({ error: 'Данный email уже существует' });
    } else {
      const newUser = await Player.create({
        login,
        email,
        password: await bcrypt.hash(password, 10),
      });
      req.session.user = {
        userId: newUser.Id,
        userEmail: newUser.email,
        userPassword: newUser.password,
        userLogin: newUser.login,
      };
      res.json({
        id: user.id,
        login: user.login,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error });
  }
});

userRouter.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Player.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = {
        userId: user.id,
        userEmail: user.email,
        userPassword: user.password,
        userLogin: user.login,
      };
      res.json({
        id: user.id,
        login: user.login,
      });
      // console.log(req.session.user);
    } else {
      res.status(404).send({ error: 'Неправильный email и/или пароль' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
});

userRouter.get('/session', (req, res) => {
  if (!req.session.user) {
    req.session.user = {};
    res.end();
  } else {
    const user = {
      id: req.session.user.userId,
      login: req.session.user.userLogin,
    };
    res.json(user);
    // res.json(req.session.user);
  }
});

userRouter.get('/logout', (req, res) => {
  console.log(req.session);
  req.session.destroy();
  res.clearCookie('MyCookie');
  res.end();
});

module.exports = userRouter;
