const express = require('express');
const router = express.Router();

const authentication = require('../../middlewares/authentication');
const transaksiController = require('../controllers/TransaksiController');

router.use(authentication);
router.get('/', transaksiController.getAllTransaksi);
router.post('/', transaksiController.createTransaksi);

module.exports = router;
