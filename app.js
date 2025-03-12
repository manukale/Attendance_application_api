require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
const  mongoose = require('mongoose')
const userRouter = require('./routes/user')
const attendanceRouter = require('./routes/attendance')

app.use(cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  }));

mongoose.connect(process.env.URL).then(()=>{
    console.log('Database connected Successfully at ' + process.env.PORT);
}).catch(()=>{
    console.log('failed to connect');
    
})
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("<h2>home page</h2>");
//   res.send(JSON.stringify(product));
});

// app.use("/api/profile_photos", express.static("profile_photos"));
app.use('/photos', express.static('photos'));
app.use('/user',userRouter)
app.use('/attendance',attendanceRouter)


module.exports = app