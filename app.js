const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

app.use('/users', usersRouter);

app.listen(3000, () => {
  console.log("Сервер запущен! Порт: "+PORT);
})