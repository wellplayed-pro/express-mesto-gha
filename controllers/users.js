const User = require('../models/user');

const createUser = (req, res) => {

    const { name, about, avatar } = req.body;

    User.create({ name, about, avatar })
    .then((user) => {
        res.send(user)
    })
    .catch((error) => {
        res.status(400).send(error);
    })
}

const getUsers = (req, res) => {

    User.find({})
    .then((users) => {
        res.send(users)
    })
    .catch((error) => {
        res.status(400).send(error);
    })
}

const getUser = (req, res) => {

    const { id } = req.params

    User.findById(id)
    .then((user) => {
        res.send(user)
    })
    .catch((error) => {
        res.status(400).send(error);
    })
}

module.exports = {
    createUser,
    getUsers,
    getUser
}