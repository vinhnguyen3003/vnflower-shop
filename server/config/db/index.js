require('dotenv').config()
const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@flower-website.5m7g3.mongodb.net/Flower-Website?retryWrites=true&w=majority`,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Connect Mongodb successfully")
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

module.exports = {connect};