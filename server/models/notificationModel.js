const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    notiContent: String,
    customerName: String,
    isRead: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('notifications', NotificationSchema);