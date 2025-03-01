const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name  : {type:String},
    email : {type: String},
    dept : {type: String},
    role : {type : String},
    password : {type :String},
    photo : {type:String}
})

module.exports = mongoose.model('user', userSchema)