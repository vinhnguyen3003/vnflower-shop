const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product: {},
    quantity: {
        type: Number
    }
});

const OrderSchema = new Schema({
    sex: {
        type: String,
        default: 'Nam'
    },
    customerName: {
        type: String,
        require
    },
    customerPhone: {
        type: String,
        require
    },
    customerAddress: {
        type: String,
        require
    },
    customerRequest: {
        type: String
    },
    deliveryMethod: {
        type: String,
        default: 'Giao hàng tận nơi'
    },
    cartInfo: [ProductSchema],

    totalAll: {
        itemCount: {
            type: Number
        },
        totalPrice: {
            type: Number
        }
    },
    orderStatus: {
        type: Number,
        default: 0
    },
    orderNote: {
        type: String,
        default: ''
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('orders', OrderSchema);