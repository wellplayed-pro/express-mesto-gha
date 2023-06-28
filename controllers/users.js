const User = require('../models/user');
const { ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/typical_errors');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка (500).', error: error.message });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка (500).', error: error.message }));
};

const getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail(() => new Error('Not Found'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' });
        return;
      } if (error.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка (500)', error: error.message });
    });
};

const updateProfileUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка (500)', error: error.message });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'Неизвестная ошибка (500)', error: error.message });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateAvatarUser,
  updateProfileUser,
};
