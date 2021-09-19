const express = require('express');

const router = express.Router();

const userCtrl = require('../controller/userCtrl');

const verifyToken = require('./../middleware/auth');

router.get('/', verifyToken, userCtrl.getUser);

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.post('/login-with', userCtrl.loginWith);

router.put('/refreshToken', userCtrl.putRefreshToken);

router.delete('/logout', verifyToken, userCtrl.logout);


module.exports = router


