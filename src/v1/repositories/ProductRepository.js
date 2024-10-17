const { where } = require('sequelize');
const Product = require('../models/Product');

const findAll = async () => {
    return await Product.findAll();
};

const findById = async (id) => {
    return await Product.findByPk(id);
};

const findByName = async (name) => {
    console.log(name);

    return await Product.findOne({ where: { nama: name } });
};

const create = async (data) => {
    return await Product.create(data);
};

const update = async (id, data) => {
    return await Product.update(data, { where: { id } });
};

const destroy = async (id) => {
    return await Product.destroy({ where: { id } });
};

module.exports = {
    findAll,
    findById,
    findByName,
    create,
    update,
    destroy,
};
