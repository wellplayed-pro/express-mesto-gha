const router = require('express').Router();

const { createUser, getUsers, getUser, updateProfileUser, updateAvatarUser }  = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
