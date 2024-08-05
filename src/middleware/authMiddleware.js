const { verifyToken } = require('../utils/auth');
const { AuthorizationError } = require('./errorHandler');

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AuthorizationError('Not Authorized');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        throw new AuthorizationError('Not Authorized');
    }
}

module.exports = { authMiddleware };