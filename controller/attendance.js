const attendance = require('../model/attendance')
const moment = require("moment")

const addAttendance = async(req,res,next) =>{
    try {
        req.body.date = moment(new Date()).format('DD/MM/YYYY')
        req.body.punchIn= moment().format('HH:mm');
        req.body.isPresent =true
        
        const newAttendance = new attendance(req.body); 
        const result = await newAttendance.save(); 
        res.status(200).json({ msg: "Attendance added successfully" });
    } catch (error) {
      next(error)  
    }
}

const getAttendance = async(req, res , next)=>{
try {
    const result = await attendance.find().populate('user');
    res.status(200).json(result);   
} catch (error) {
    console.log(error);
    
}
}

module.exports = {
    addAttendance,
    getAttendance,
}