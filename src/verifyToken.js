const jwt =require('jsonwebtoken');
const config = require('./config')

module.exports =  (req,res,next)=>{
 try {
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(401).json({auth:false,token:null,message:"Token not provided"})
    }

    const {id} = jwt.verify(token,config.secret);
    req.userId = id
    next();
     
 } catch (error) {
    return res.status(500).json({auth:false,token:null,message:"Token failed"})
 }
}