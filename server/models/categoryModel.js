const mongoose = require('mongoose');

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    categoryID: {
        type: String,
        require: true,
        unique: true
    },
    categoryName: {
        type: String,
        require: true,
        unique: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('categorys', CategorySchema);