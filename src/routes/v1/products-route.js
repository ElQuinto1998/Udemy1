const router = require('express').Router();
const productController = require('../../controllers/v1/products-controller');

router.post('/create', productController.createProduct);
router.post('/delete', productController.deleteProduct);
router.get('/get-all', productController.getProducts);
router.get('/get-by-user/:userId', productController.getProductsByUser);

module.exports = router;
