const productRepository = require('../repositories/ProductRepository');
const ResponseError = require('../../utilities/response-error');

const getProducts = async () => {
    return await productRepository.findAll();
};

const getProductById = async (id) => {
    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
        throw new ResponseError('Product not found', 404);
    }
    return await productRepository.findById(id);
};

const createProduct = async (data, user) => {
    if (user.level !== 'merchant') {
        throw new ResponseError('Only merchant users can create the data', 403);
    }

    return await productRepository.create(data);
};

const updateProduct = async (id, data, user) => {
    if (user.level !== 'merchant') {
        throw new ResponseError('Only merchant users can update the data', 403);
    }

    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
        throw new ResponseError('Product not found', 404);
    }

    return await productRepository.update(id, data);
};

const deleteProduct = async (id, user) => {
    if (user.level !== 'merchant') {
        throw new ResponseError('Only merchant users can delete the data', 403);
    }

    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
        throw new ResponseError('Product not found', 404);
    }

    return await productRepository.destroy(id);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
