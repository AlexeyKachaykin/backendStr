const { db, mapKeys } = require('../data-access/database');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');
const userService = require('./userService');
const eventService = require('./eventService');

async function getBetById(id) {
    const bet = await db('bet').where({ id }).first();
    if (!bet) {
        throw new NotFoundError('Bet not found');
    }
    return mapKeys(bet);
}

async function createBet(betData) {
    const { userId, eventId, betAmount, prediction } = betData;

    const user = await userService.getUserById(userId);
    const event = await eventService.getEventById(eventId);

    if (user.balance < betAmount) {
        throw new ValidationError('Not enough balance');
    }

    const odds = await eventService.getOddsByEventId(eventId);
    let multiplier;
    switch (prediction) {
        case 'home':
            multiplier = odds.homeWin;
            break;
        case 'draw':
            multiplier = odds.draw;
            break;
        case 'away':
            multiplier = odds.awayWin;
            break;
        default:
            throw new ValidationError('Invalid prediction');
    }

    const [bet] = await db('bet').insert({
        user_id: userId,
        event_id: eventId,
        bet_amount: betAmount,
        prediction,
        multiplier
    }).returning('*');

    await userService.updateUserBalance(userId, -betAmount);

    return mapKeys(bet);
}

async function updateBet(id, betData) {
    const [updatedBet] = await db('bet').where({ id }).update(betData).returning('*');
    if (!updatedBet) {
        throw new NotFoundError('Bet not found');
    }
    return mapKeys(updatedBet);
}

async function deleteBet(id) {
    const deletedCount = await db('bet').where({ id }).delete();
    if (deletedCount === 0) {
        throw new NotFoundError('Bet not found');
    }
    return { message: 'Bet deleted successfully' };
}

module.exports = {
    getBetById,
    createBet,
    updateBet,
    deleteBet
};