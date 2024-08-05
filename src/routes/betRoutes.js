const { getBetById, createBet, updateBet, deleteBet } = require('../controllers/betController');
const { authMiddleware } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/:id', authMiddleware, getBetById);
router.post('/', authMiddleware, createBet);
router.put('/:id', authMiddleware, updateBet);
router.delete('/:id', authMiddleware, deleteBet);

module.exports = router;