const { db, mapKeys } = require('../data-access/database');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');
const { generateToken } = require('../utils/auth');

async function getUserById(id) {
    const user = await db('user').where({ id }).first();
    if (!user) {
        throw new NotFoundError('User not found');
    }
    return mapKeys(user);
}

async function createUser(userData) {
    try {
        const [user] = await db('user').insert({
            ...userData,
            balance: 0
        }).returning('*');
        const token = generateToken(user);
        return { ...mapKeys(user), accessToken: token };
    } catch (error) {
        if (error.code === '23505') {  // PostgreSQL unique violation error code
            if (error.constraint === 'users_email_key') {
                throw new ValidationError('Email already taken');
            } else if (error.constraint === 'users_phone_key') {
                throw new ValidationError('Phone number already taken');
            }
        }
        throw error;
    }
}

async function updateUser(id, userData) {
    try {
        const [updatedUser] = await db('user').where({ id }).update(userData).returning('*');
        if (!updatedUser) {
            throw new NotFoundError('User not found');
        }
        return mapKeys(updatedUser);
    } catch (error) {
        if (error.code === '23505') {  // PostgreSQL unique violation error code
            if (error.constraint === 'users_email_key') {
                throw new ValidationError('Email already taken');
            } else if (error.constraint === 'users_phone_key') {
                throw new ValidationError('Phone number already taken');
            }
        }
        throw error;
    }
}

async function getUserBalance(id) {
    const user = await getUserById(id);
    return user.balance;
}

async function updateUserBalance(id, amount) {
    const [updatedUser] = await db('user')
        .where({ id })
        .increment('balance', amount)
        .returning('*');
    if (!updatedUser) {
        throw new NotFoundError('User not found');
    }
    return mapKeys(updatedUser);
}

module.exports = {
    getUserById,
    createUser,
    updateUser,
    getUserBalance,
    updateUserBalance
};