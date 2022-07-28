const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');
const generateToken=require('../utils/generateToken');

module.exports={

authenticateAdmin:asyncHandler(async(req,res,next)=>{
    console.log(process.env.ADMIN_MAIL_ID);
    console.log(process.env.ADMIN_PASSWORD);
    if(req.body.email===process.env.ADMIN_MAIL_ID && req.body.password===process.env.ADMIN_PASSWORD){
        const token=generateToken(process.env.SECRET_KEY)
        console.log('token');
        console.log(token);
        res.json({status:'ok',token:token});
    }else{
        res.json({status:'error',message:'username or password incorrect'})
    }

})

}