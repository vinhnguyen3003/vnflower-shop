const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    recipients: [{
         type: mongoose.Types.ObjectId, 
         ref: 'users' 
    }],
    content: String,
    isRead: false
}, {
    timestamps: true
})

module.exports = mongoose.model('conversation', conversationSchema)