const express = require('express');
const { getUserById, createUser, updateUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');
const validateUUID = require('../middleware/validateUUID');

const router = express.Router();

router.get('/:id', validateUUID, getUserById);
router.post('/', createUser);
router.put('/:id', validateUUID, authMiddleware, updateUser);

module.exports = router;