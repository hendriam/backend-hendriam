const express = require('express');
const router = express.Router();

const authentication = require('../../middlewares/authentication');
const productController = require('../controllers/ProductController');

router.use(authentication);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);

module.exports = router;
