class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.status = 400;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthorizationError';
        this.status = 401;
    }
}

function errorHandler(err, req, res, next) {
    if (err instanceof NotFoundError || err instanceof ValidationError || err instanceof AuthorizationError) {
        return res.status(err.status).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { errorHandler, NotFoundError, ValidationError, AuthorizationError };