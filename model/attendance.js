const mongose = require('mongoose')

const attendanceSchema = mongose.Schema({
  
    name  : {type:String},
    dept : {type: String},
    punchIn : {type: String},
    date : {type : String, default: Date.now()},
    isPresent : {type : Boolean},
    user: {type:mongose.Schema.Types.ObjectId, ref:'user'}
     
     
})

module.exports = mongose.model('attendance', attendanceSchema)