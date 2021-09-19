const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversation: { 
        type: mongoose.Types.ObjectId, 
        ref: 'conversation' 
    },
    sender: { 
        type: mongoose.Types.ObjectId, 
        ref: 'users' 
    },
    recipient: { 
        type: mongoose.Types.ObjectId, 
        ref: 'users' 
    },
    content: String
}, {
    timestamps: true
})

module.exports = mongoose.model('message', messageSchema);