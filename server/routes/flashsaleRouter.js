const express = require('express')

const router = express.Router();

const verifyToken = require('../middleware/auth');

const flashsaleCtrl = require('../controller/flashsaleCtrl');


router.get('/', flashsaleCtrl.getFlashsale);

router.post('/create', verifyToken, flashsaleCtrl.createFlashsale)

router.put('/update/:id', flashsaleCtrl.updateFlashsale);


module.exports = router