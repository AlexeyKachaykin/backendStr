const { db, mapKeys } = require('../data-access/database');
const { NotFoundError } = require('../middleware/errorHandler');
const userService = require('./userService');

async function getTransactionById(id) {
    const transaction = await db('transaction').where({ id }).first();
    if (!transaction) {
        throw new NotFoundError('Transaction not found');
    }
    return mapKeys(transaction);
}

async function createTransaction(transactionData) {
    const { userId, cardNumber, amount } = transactionData;

    await userService.getUserById(userId); // This will throw if user doesn't exist

    const [transaction] = await db('transaction').insert({
        user_id: userId,
        card_number: cardNumber,
        amount
    }).returning('*');

    await userService.updateUserBalance(userId, amount);

    return mapKeys(transaction);
}

async function updateTransaction(id, transactionData) {
    const [updatedTransaction] = await db('transaction').where({ id }).update(transactionData).returning('*');
    if (!updatedTransaction) {
        throw new NotFoundError('Transaction not found');
    }
    return mapKeys(updatedTransaction);
}

async function deleteTransaction(id) {
    const deletedCount = await db('transaction').where({ id }).delete();
    if (deletedCount === 0) {
        throw new NotFoundError('Transaction not found');
    }
    return { message: 'Transaction deleted successfully' };
}

module.exports = {
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};