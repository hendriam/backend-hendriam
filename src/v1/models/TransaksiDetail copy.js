"use strict";
module.exports = (sequelize, DataTypes) => {
  const TransaksiDetail = sequelize.define(
    "TransaksiDetail",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      transaksi_id: DataTypes.INTEGER,
      produk_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      tanggal: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      tableName: "transaksi_detail",
    },
  );
  return TransaksiDetail;
};
