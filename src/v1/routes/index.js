const express = require('express');
const router = express.Router();

const routeAuth = require('./routeAuth');
const routeProduct = require('./routeProduct');
const routeTransaksi = require('./routeTransaksi');

router.use('/auth', routeAuth);
router.use('/product', routeProduct);
router.use('/transaksi', routeTransaksi);

module.exports = router;
