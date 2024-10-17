const { verifyToken } = require('../utilities/jwt');
const ResponseError = require('../utilities/response-error');

const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new ResponseError('No token provided', 401);
    }

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ResponseError('Invalid or expired token', 403);
    }
};

module.exports = authentication;
