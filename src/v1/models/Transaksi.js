const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const Transaksi = sequelize.define('transactions', {
    user_id: DataTypes.INTEGER,
    invoice: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    ongkir: DataTypes.DECIMAL,
    diskon: DataTypes.DECIMAL,
    total_bayar: DataTypes.DECIMAL,
});

module.exports = Transaksi;
