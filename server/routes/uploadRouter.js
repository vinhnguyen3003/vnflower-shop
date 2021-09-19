const express = require('express');

const router = express.Router();

const uploadCtrl = require('./../controller/uploadCtrl');

router.post('/upload', uploadCtrl.upload);

router.post('/destroy', uploadCtrl.destroy);

module.exports = router