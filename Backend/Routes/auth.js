const express=require('express')
const User =require('../Models/User')
const router =express.Router()
//Create a usser using post "/api/auth/".Does'nt require auth


router.post('/',(req,res)=>{
    console.log(req.body);
    const user=new User(req.body);
    user.save();
    res.send(req.body);
})  

module.exports=router