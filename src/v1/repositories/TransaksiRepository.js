const Transaksi = require('../models/Transaksi');
const TransaksiDetail = require('../models/TransaksiDetail');

const createTransaksi = async (data) => {
    return await Transaksi.create(data);
};

const createTransaksiDetail = async (data) => {
    return await TransaksiDetail.create(data);
};

const findAllTransaksi = async () => {
    return await Transaksi.findAll();
};

module.exports = {
    createTransaksi,
    createTransaksiDetail,
    findAllTransaksi,
};
