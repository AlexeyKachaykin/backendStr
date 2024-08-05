const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const requestLogger = (req, res, next) => {
    logger.info(`${ req.method } ${ req.url }`, {
        timestamp: new Date().toISOString(),
    });
    next();
};

const errorLogger = (err, req, res, next) => {
    logger.error(`${ err.status || 500 } - ${ err.message } - ${ req.originalUrl } - ${ req.method } - ${ req.ip }`);
    next(err);
};

module.exports = { logger, requestLogger, errorLogger };