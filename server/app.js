const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');

const path = require('path');
const cors = require('cors');
require('dotenv').config();
const dbCheck = require('./db/dbConnectionCheck');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const userRouter = require('./routes/userRouter');
const gameRouter = require('./routes/gameRouter');

const corsConfig = {
  // Домены которым разрешен доступ к файлам
  origin: ['http://localhost:3000'],
  credentials: true,
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: corsConfig });

const PORT = process.env.PORT ?? 3001;

const sessionConfig = {
  store: new FileStore(),
  name: 'MyCookie',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 60,
    httpOnly: true,
  },
};

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(session(sessionConfig));

app.use(cors(corsConfig));
app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/game', gameRouter);

dbCheck();

httpServer.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
