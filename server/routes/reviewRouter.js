const express = require('express')

const router = express.Router();

const reviewCtrl = require('./../controller/reviewCtrl');

router.get('/:id', reviewCtrl.getReviews);

router.post('/create', reviewCtrl.createReview);

module.exports = router;