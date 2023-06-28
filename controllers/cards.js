const Card = require('../models/card');

const createCard = (req, res) => {

    const { name, about, avatar } = req.body;

    Card.create({ name, about, avatar })
    .then((user) => {
        res.send(user)
    })
    .catch((error) => {
        res.status(400).send(error);
    })
}

const getCards = (req, res) => {

    User.find({})
    .then((cards) => {
        res.send(cards)
    })
    .catch((error) => {
        res.status(400).send(error);
    })
}

const deleteCardById = (req, res) => {

    const { id } = req.params

    Card.findById(id)
    .then((user) => {
        res.send(user)
    })
    .catch((error) => {
        res.status(400).send(error);
    })
}

module.exports = {
  getCards,
  createCard,
  deleteCardById
};