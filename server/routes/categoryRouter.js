const express = require('express')

const router = express.Router();

const verifyToken = require('../middleware/auth');

const categoryCtrl = require('../controller/categoryCtrl');


router.get('/', categoryCtrl.getCategory);

router.post('/create', verifyToken, categoryCtrl.createCategory);

router.put('/update/:id', verifyToken, categoryCtrl.updateCategory);

router.delete('/:id', verifyToken, categoryCtrl.deleteCategory);


module.exports = router