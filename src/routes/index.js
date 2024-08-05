const express = require('express');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const betRoutes = require('./betRoutes');
const transactionRoutes = require('./transactionRoutes');
const statsRoutes = require('./statsRoutes');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/bets', authMiddleware, betRoutes);
router.use('/transactions', authMiddleware, transactionRoutes);
router.use('/stats', authMiddleware, statsRoutes);

router.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

module.exports = router;