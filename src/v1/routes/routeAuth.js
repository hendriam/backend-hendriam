const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');

router.post('', authController.getToken);

module.exports = router;
