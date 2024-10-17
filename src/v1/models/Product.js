const { DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

const Product = sequelize.define('products', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Nama produk sudah ada',
        },
        validate: {
            notEmpty: {
                msg: 'Nama produk tidak boleh kosong',
            },
        },
    },
    harga: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Harga produk tidak boleh kosong',
            },
            isDecimal: {
                msg: 'Harga produk harus decimal',
            },
        },
    },
});

module.exports = Product;
