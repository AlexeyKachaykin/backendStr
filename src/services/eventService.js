const { db, mapKeys } = require('../data-access/database');
const { NotFoundError } = require('../middleware/errorHandler');

async function getEventById(id) {
    const event = await db('event').where({ id }).first();
    if (!event) {
        throw new NotFoundError('Event not found');
    }
    return mapKeys(event);
}

async function createEvent(eventData) {
    const [event] = await db('event').insert(eventData).returning('*');
    return mapKeys(event);
}

async function updateEvent(id, eventData) {
    const [updatedEvent] = await db('event').where({ id }).update(eventData).returning('*');
    if (!updatedEvent) {
        throw new NotFoundError('Event not found');
    }
    return mapKeys(updatedEvent);
}

async function deleteEvent(id) {
    const deletedCount = await db('event').where({ id }).delete();
    if (deletedCount === 0) {
        throw new NotFoundError('Event not found');
    }
    return { message: 'Event deleted successfully' };
}

async function getOddsByEventId(eventId) {
    const event = await getEventById(eventId);
    const odds = await db('odds').where({ id: event.oddsId }).first();
    if (!odds) {
        throw new NotFoundError('Odds not found');
    }
    return mapKeys(odds);
}

module.exports = {
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getOddsByEventId
};