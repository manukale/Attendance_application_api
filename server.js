const http = require('http')
// import http from 'http';
require('dotenv').config()
const app = require("./app")

const server = http.createServer(app)
server.listen(process.env.PORT,()=>{
    console.log('server is started... ');
    
})