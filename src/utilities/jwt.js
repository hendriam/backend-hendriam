const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const ResponseError = require('./response-error');

const secretKey = config.jwtSecret;
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: config.expiresIn });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new ResponseError('Invalid Token', 401);
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
