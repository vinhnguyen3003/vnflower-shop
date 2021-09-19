const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    loginName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        default: "User"
    },
    userRole: {
        type: Number,
        default: 1
    },
    userAvatar: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    refreshToken: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('users', UserSchema)