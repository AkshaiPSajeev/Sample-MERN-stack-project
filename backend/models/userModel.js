const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const User=new mongoose.Schema(
    {
    Name:{type:String,required:true},
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    Status:{type:Boolean,default:true}
    },
    {
        collection:'Users'
    }
);

User.methods.checkPassword=async function(password){
return bcrypt.compare(password,this.Password)
}

module.exports=mongoose.model('Users',User);