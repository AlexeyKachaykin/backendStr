const betService = require('../services/betService');
const { ValidationError } = require('../middleware/errorHandler');
const Joi = require('joi');

const betSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    eventId: Joi.string().uuid().required(),
    betAmount: Joi.number().positive().required(),
    prediction: Joi.string().valid('home', 'draw', 'away').required()
});

async function getBetById(req, res, next) {
    try {
        const bet = await betService.getBetById(req.params.id);
        res.json(bet);
    } catch (error) {
        next(error);
    }
}

async function createBet(req, res, next) {
    try {
        const { error, value } = betSchema.validate(req.body);
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        const bet = await betService.createBet(value);
        res.status(201).json(bet);
    } catch (error) {
        next(error);
    }
}

async function updateBet(req, res, next) {
    try {
        const bet = await betService.updateBet(req.params.id, req.body);
        res.json(bet);
    } catch (error) {
        next(error);
    }
}

async function deleteBet(req, res, next) {
    try {
        const result = await betService.deleteBet(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getBetById,
    createBet,
    updateBet,
    deleteBet
};