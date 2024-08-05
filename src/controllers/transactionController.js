const transactionService = require('../services/transactionService');
const { ValidationError } = require('../middleware/errorHandler');
const Joi = require('joi');

const transactionSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    cardNumber: Joi.string().required(),
    amount: Joi.number().positive().required()
});

async function getTransactionById(req, res, next) {
    try {
        const transaction = await transactionService.getTransactionById(req.params.id);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
}

async function createTransaction(req, res, next) {
    try {
        const { error, value } = transactionSchema.validate(req.body);
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        const transaction = await transactionService.createTransaction(value);
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
}

async function updateTransaction(req, res, next) {
    try {
        const transaction = await transactionService.updateTransaction(req.params.id, req.body);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
}

async function deleteTransaction(req, res, next) {
    try {
        const result = await transactionService.deleteTransaction(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};