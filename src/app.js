const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./configs/config');
const logger = require('./configs/logger');
const sequelize = require('./configs/database');
const errorHandler = require('./middlewares/error-handler');

const startApp = async () => {
    try {
        await sequelize.sync();
        logger.info('Database connected successfully');

        // Use body-parser middleware
        app.use(bodyParser.json());

        // routes
        app.use('/api/v1', require('./v1/routes'));

        // Error handling middleware
        app.use(errorHandler);

        // start server
        app.listen(config.port, () => {
            logger.info(`Server running http://${config.host}:${config.port}/`);
        });
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = startApp;
