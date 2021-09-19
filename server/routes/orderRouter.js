const express = require('express');
const verifyToken = require('../middleware/auth');

const router = express.Router();

const OrderCtrl = require('../controller/orderCtrl');


router.get('/', OrderCtrl.getOrder);

router.post('/create', OrderCtrl.createOrder);

router.put('/:id', OrderCtrl.updateOrder);

router.delete('/:id', verifyToken, OrderCtrl.deleteOrder);

module.exports = router;