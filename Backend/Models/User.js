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

module.exports=mongoose.model('user',UserSchema); 