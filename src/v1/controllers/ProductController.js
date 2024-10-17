const logger = require('../../configs/logger');
const productService = require('../services/ProductService');

const getAll = async (req, res, next) => {
    try {
        const products = await productService.getProducts();
        logger.info(`Product list successfully retrieved' => ${JSON.stringify(products)}`);
        return res.status(200).json({
            message: 'Product list successfully retrieved',
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        logger.info(`Product successfully retrieved by ID' => ${JSON.stringify(product)}`);
        return res.status(200).json({
            message: 'Product successfully retrieved by ID',
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const created = await productService.createProduct(req.body, req.user);
        logger.info(`Product created successfully' => ${JSON.stringify(created)}`);
        return res.status(201).json({
            message: 'Product created successfully',
            data: created,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const updated = await productService.updateProduct(
            parseInt(req.params.id),
            req.body,
            req.user
        );
        logger.info(`Product updated successfully' => ${JSON.stringify(updated)}`);
        return res.status(200).json({
            message: 'Product updated successfully',
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        const deleted = await productService.deleteProduct(parseInt(req.params.id), req.user);
        logger.info(`Product deleted successfully' => ${JSON.stringify(deleted)}`);
        return res.status(200).json({
            message: 'Product deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
};
