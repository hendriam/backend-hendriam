const logger = require('../configs/logger');
const ResponseError = require('../utilities/response-error');
const { ValidationError } = require('sequelize');

const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    if (err instanceof ValidationError) {
        const errors = err.errors.map((error) => ({
            path: error.path,
            message: error.message,
            value: error.value,
        }));

        return res.status(400).json({
            message: 'Validation Error',
            errors: errors,
        });
    }

    if (err instanceof ResponseError) {
        logger.warn(`${JSON.stringify({ message: err.message })}`);
        return res.status(err.statusCode).json({ message: err.message });
    }

    logger.error(`${JSON.stringify({ message: err.message })}`);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = errorHandler;
