const express = require("express");
const multer = require('multer')

const router = express.Router();
const { registerUser, getUser, loginUser, getUserByEmail, updateUser, deleteUser ,} = require('../controller/user');

const photoUploader = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'photos')
            // console.log('dest::',destination);
        },
        filename:(req,file,cb)=>{
            
            console.log('filename::',file);
            cb(null,file.fieldname+Date.now()+'.jpg')
        }
        
    })
}).single('photo')

// const upload = multer({ storage: photoUploader });

router.post('/registerUser',photoUploader, registerUser )
router.post('/loginUser', loginUser )
router.get('/getUser', getUser )
router.get('/getUserByEmail/:email', getUserByEmail )
router.put('/updateUser/:id', photoUploader,updateUser )
router.delete('/deleteUser/:id', deleteUser )



module.exports = router;

