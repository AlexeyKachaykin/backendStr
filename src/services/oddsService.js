const { db, mapKeys } = require('../data-access/database');
const { NotFoundError } = require('../middleware/errorHandler');

async function getOddsById(id) {
    const odds = await db('odds').where({ id }).first();
    if (!odds) {
        throw new NotFoundError('Odds not found');
    }
    return mapKeys(odds);
}

async function createOdds(oddsData) {
    const [odds] = await db('odds').insert(oddsData).returning('*');
    return mapKeys(odds);
}

async function updateOdds(id, oddsData) {
    const [updatedOdds] = await db('odds').where({ id }).update(oddsData).returning('*');
    if (!updatedOdds) {
        throw new NotFoundError('Odds not found');
    }
    return mapKeys(updatedOdds);
}

async function deleteOdds(id) {
    const deletedCount = await db('odds').where({ id }).delete();
    if (deletedCount === 0) {
        throw new NotFoundError('Odds not found');
    }
    return { message: 'Odds deleted successfully' };
}

module.exports = {
    getOddsById,
    createOdds,
    updateOdds,
    deleteOdds
};