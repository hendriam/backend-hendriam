const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const TransactionDetail = sequelize.define('transaction_details', {
    transaksi_id: DataTypes.INTEGER,
    produk_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
});

module.exports = TransactionDetail;
