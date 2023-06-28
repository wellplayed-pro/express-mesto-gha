const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./errors/typical_errors');
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649c236edd2a1497694a1f0b'
  };
  next();
});
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(_ => {
  console.log('connected')
});

app.use(bodyParser.json());

app.use(router);
app.use('/', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена'});
});


app.listen(3000, () => {
  console.log("Сервер запущен! Порт: "+PORT);
})