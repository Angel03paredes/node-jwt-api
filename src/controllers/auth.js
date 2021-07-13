const User = require("../models/User");
const jwt = require('jsonwebtoken');
const config  = require('./../config');
const auth = {};     

auth.signup = async(req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const user = new User({ userName, email, password });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    const token = jwt.sign({id:user._id},config.secret,{expiresIn:60 * 60 * 24})
    res.json({ auth: true,token });
  } catch (error) {
    res.status(500).json({message:"error",auth:false,token:false})
  }
};

auth.signin = async(req, res, next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({auth:false,token:null,message:"The email doesn't exists"})
    }
    const validatePassword = await user.comparePassword(password);
    if(!validatePassword){
        return res.status(404).json({auth:false,token:null,message:"The password not match"})
    }
    const token = jwt.sign({id:user._id},config.secret,{expiresIn:60*60*24})
  res.json({ auth:true,token });
};

auth.me = async(req, res, next) => {
    try{
        
    const user = await User.findById(req.userId,{password:0});
    console.log(req.userId);
    if(!user){
        return res.status(404).json({message:"User not found"})
    }

  return res.json(user);
}catch(err){
    return res.status(401).json({message:"Token not provided",err})
}
};

module.exports = auth;
