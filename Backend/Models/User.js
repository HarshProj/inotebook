const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const {Schema} =mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    date:{
        type:Date,
        require:Date.now
    }
  });
const User=mongoose.model('user',UserSchema); 
// User.createIndexes();
module.exports=User