const Transaksi = require('../models/Transaksi');
const TransaksiDetail = require('../models/TransaksiDetail');

const createTransaksi = async (data) => {
    return await Product.create(data);
};

module.exports = {
    createTransaksi,
};
