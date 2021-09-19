const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewContent: {
        type: String
    },
    reviewName: {
        type: String,
        require: true
    },
    reviewPhone: {
        type: String,
        require: true
    },
    reviewImage: {
        type: String
    },
    reviewStar: {
        type: Number,
        default: 5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    productID: {
        type: String
        // type: Schema.Types.ObjectId,
        // ref: 'products'
    }
})

module.exports = mongoose.model('reviews', ReviewSchema)