const express = require('express');
const verifyToken = require('../middleware/auth');

const router = express.Router();
const NotificationCtrl = require('./../controller/notificationCtrl');

router.get('/',verifyToken, NotificationCtrl.getNoti);

router.post('/create', NotificationCtrl.createNoti);

router.put('/:id', verifyToken, NotificationCtrl.updateNoti);

router.delete('/:id', verifyToken, NotificationCtrl.deleteNoti);

module.exports = router;