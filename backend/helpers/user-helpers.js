const mongoose=require('mongoose');
const User=require('../models/userModel')
const asyncHandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const generateToken=require('../utils/generateToken');

module.exports={

    registerUser:asyncHandler(async(req,res,next)=>{
        
       let salt=await bcrypt.genSalt(10); 
       let encryptedPassword=await bcrypt.hash(req.body.password,salt);
        try{
         
            const user= await User.create({
                Name:req.body.name,
                Email:req.body.email,
                Password:encryptedPassword
            })
           res.json({status:'ok'})
          }catch(err){
            console.log(err);
            res.json({status:'error',error:'user already exist'})
          }

    }),
    doLogin:asyncHandler(async(req,res,next)=>{
        const {email,password}=req.body;
      
        const user=await User.findOne({Email:email});
        console.log(user);
        console.log(typeof user.Status)
        if(user && await bcrypt.compare(password,user.Password)){
            const token=generateToken(user._id);
         res.json({status:'ok',token:token,user:user});
        }else{
            throw new Error('invalid username or password')
            //res.json({status:'error',error:'username or password incorrect'})
        }
    }
  
    ),
    getAllUsers:asyncHandler(async(req,res,next)=>{
        let users=await User.find({});
        res.json({users});
    }),
    blockUser:asyncHandler(async(req,res,next)=>{
        const user=await User.findOne({_id:req.body.userId});
        await user.updateOne({$set:{Status:false}});
        res.json({user,status:'ok'})
    }),
    unblockUser:asyncHandler(async(req,res,next)=>{
        const user=await User.findOne({_id:req.body.userId});
        await user.updateOne({$set:{Status:true}});
        res.json({user,status:'ok'})
    }),
    getUser:asyncHandler(async(req,res,next)=>{
        const user=await User.findOne({_id:req.body.userId});
        res.json({user})
    }),
    updateUser:asyncHandler(async(req,res,next)=>{
            
    })
       
    
}