'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaksi = sequelize.define(
        'Transaksi',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            user_id: DataTypes.INTEGER,
            total: DataTypes.INTEGER,
            ongkir: DataTypes.INTEGER,
            diskon: DataTypes.INTEGER,
            total_bayar: DataTypes.INTEGER,
            tanggal: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: false,
            tableName: 'transaksi',
        }
    );
    return Transaksi;
};
