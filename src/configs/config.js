const dotenv = require('dotenv');
dotenv.config(); // Load .env file

module.exports = {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRED,
    levelLog: process.env.LEVEL_LOG,
};
