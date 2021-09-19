const mongoose = require('mongoose');

const Schema = mongoose.Schema

const FlashsaleSchema = new Schema({
    countdown: {
        type: String,
        require: true,
        default: "August 26, 2021 09:50:00"
    }
})

module.exports = mongoose.model('flashsale', FlashsaleSchema);