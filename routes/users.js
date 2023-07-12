const router = require('express').Router();
const { validateUserId, validateProfileUpdate, validateAvatarUpdate } = require('../utils/regex');
const {
  createUser, getUsers, getUser, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', validateUserId, getUser);
router.patch('/me', validateProfileUpdate, updateProfileUser);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatarUser);

module.exports = router;
