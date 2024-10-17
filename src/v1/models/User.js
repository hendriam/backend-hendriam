const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('merchant', 'customer'),
        allowNull: false,
        defaultValue: 'merchant',
    },
});

module.exports = User;
