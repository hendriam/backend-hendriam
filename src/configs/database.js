const Sequelize = require('sequelize');
const config = require('./config');
const logger = require('./logger');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
    host: config.dbHost,
    dialect: 'mysql',
});

const dbConnection = async () => {
    try {
        await sequelize.sync();
        logger.info('Database connected successfully');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = sequelize;
