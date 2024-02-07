const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : String,
    password : {
        type : String
    }
}, { timeStamps : true})

module.exports = mongoose.model('users', userSchema)