const express = require('express');
const verifyToken = require('../middleware/auth');

const router = express.Router();

const ProductCtrl = require('./../controller/productCtrl');



router.get('/', ProductCtrl.getProducts);

router.get('/condition', ProductCtrl.getProductByCondition);

router.get('/product-detail/:id', ProductCtrl.getProductDetail);

router.post('/create', verifyToken, ProductCtrl.createProduct);

router.put('/:id', verifyToken, ProductCtrl.updateProduct);

router.delete('/:id', verifyToken, ProductCtrl.deleteProduct);

module.exports = router;