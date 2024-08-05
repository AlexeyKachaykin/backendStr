const eventService = require('../services/eventService');
const { ValidationError } = require('../middleware/errorHandler');
const Joi = require('joi');

const eventSchema = Joi.object({
    oddsId: Joi.string().uuid().required(),
    type: Joi.string().required(),
    homeTeam: Joi.string().required(),
    awayTeam: Joi.string().required(),
    startAt: Joi.date().iso().required(),
    score: Joi.string().allow(null)
});

async function getEventById(req, res, next) {
    try {
        const event = await eventService.getEventById(req.params.id);
        res.json(event);
    } catch (error) {
        next(error);
    }
}

async function createEvent(req, res, next) {
    try {
        const { error, value } = eventSchema.validate(req.body);
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        const event = await eventService.createEvent(value);
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
}

async function updateEvent(req, res, next) {
    try {
        const { error, value } = eventSchema.validate(req.body, { stripUnknown: true });
        if (error) {
            throw new ValidationError(error.details[0].message);
        }
        const event = await eventService.updateEvent(req.params.id, value);
        res.json(event);
    } catch (error) {
        next(error);
    }
}

async function deleteEvent(req, res, next) {
    try {
        const result = await eventService.deleteEvent(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};