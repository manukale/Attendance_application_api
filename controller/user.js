const user = require('../model/user.js');
const bcrypt = require('bcrypt')

 const loginUser = async(req, res, next)=>{
    try {
        const User = await user.findOne({ email: req.body.email });
        if (!User) {
          return res.status(200).json({ msg: 'Invalid Credential' })
        }
        const result = bcrypt.compareSync(req.body.password.trim(), User.password.trim());
        if (result === false){
          return res.status(200).json({ msg: 'Invalid Credential' })
        }else{
          // console.log('user:',User);
          
          return res.status(200).json({ msg: 'Login Successful', role : User.role })

        } 
          
    //  if(req.body.email === User.email && result && req.body.role === User.role){
    //    return res.status(200).json({ msg: 'Login Successful' , role : req.body.role }) 
    // }else{
    //       return res.status(200).json({ msg: 'Check Your Credential'}) 
    //     }
      } catch (error) {
        next(error);
      }
}
 const registerUser = async(req, res, next)=>{
try {
    req.body.photo = '/photos/'+req.file.filename
    // console.log('profilePhoto',req.body.photo);
    
    const data = await user.findOne({ email: req.body.email });
    
    if(data){
       res.status(200).json({ msg: 'User Already Exist...' })
    }
    else{
      const password = bcrypt.hashSync(req.body.password, 3);
      const newUser = new user({
        ...req.body,
        password: password,
      });
      const result = await newUser.save(); 
      if (!result){
        res.status(200).json({ msg: "User Not Created" });
      }
      res.status(200).json({ msg: "User created successfully" });
    } 
 
} catch (error) {
    next(error)
}
}
 const getUser = async(req, res, next)=>{
try {
    const result = await user.find();
    res.status(200).json(result);
 
} catch (error) {
    next(error)
}
}

const updateUser = async(req,res,next) => {
 
  try {
    if(req.file?.filename){
      req.body.photo = '/photos/'+req.file.filename
    }
      console.log('updateUser::',req.body);
        const result = await user.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json({msg:"Profile updated successfully",data:req.body})
    } catch (error) {
      next(error);
    }
}
const deleteUser = async(req,res,next) => {
  try {
    console.log('deleteUser::',req.params.id);

    const result = await user.findByIdAndDelete({_id : req.params.id},req.body)
    if (result) {
      res.status(200).json({msg:'User Deleted Successfuly'})
      
    }
    
   
   
  } catch (error) {
    next(error)
  }
}
 const getUserByEmail = async(req, res, next)=>{
try {
  // console.log(typeof(req.params.email));
  
  const result = await user.findOne({ email: req.params.email });
  // console.log(result);
  
  res.status(200).json(result)
 
} catch (error) {
    next(error)
}
}



module.exports = {
    registerUser,
    getUser,
    loginUser,
    getUserByEmail,updateUser,
    deleteUser
  };