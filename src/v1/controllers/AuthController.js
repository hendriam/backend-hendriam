const authService = require('../services/AuthService');

const getToken = async (req, res, next) => {
    try {
        const token = await authService.getToken(req.body);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = { getToken };
