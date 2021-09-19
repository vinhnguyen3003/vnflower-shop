const express = require('express')

const router = express.Router();

const verifyToken = require('../middleware/auth');

const messageCtrl = require('../controller/messageCtrl');

router.get('/message/:id', verifyToken, messageCtrl.getMessages);

router.get('/conversation', verifyToken, messageCtrl.getConversations);

router.post('/message', verifyToken, messageCtrl.createMessage);

module.exports = router