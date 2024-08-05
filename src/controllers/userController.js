const userService = require('../services/userService');
const { ValidationError } = require('../middleware/errorHandler');
const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?3?8?(0\d{9})$/).required(),
    type: Joi.string().valid('user', 'admin').required()
});

async function getUserById(req, res, next) {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        const user = await userService.createUser(value);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        if (req.user.id !== req.params.id) {
            throw new ValidationError('UserId mismatch');
        }
        const { error, value } = userSchema.validate(req.body, { stripUnknown: true });
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        const user = await userService.updateUser(req.params.id, value);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserById,
    createUser,
    updateUser
};