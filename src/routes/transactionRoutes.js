const express = require('express');
const { getTransactionById, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, getTransactionById);
router.post('/', authMiddleware, createTransaction);
router.put('/:id', authMiddleware, updateTransaction);
router.delete('/:id', authMiddleware, deleteTransaction);

module.exports = router;