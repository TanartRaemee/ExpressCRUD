const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : String,
    password : {
        type : String
    },
    role:{
        type : String,
        default: "user"
    },
}, { timeStamps : true})

module.exports = mongoose.model('users', userSchema)