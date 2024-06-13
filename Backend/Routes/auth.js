const express = require('express')
const User = require('../Models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const fetchuser=require("../Middleware/fetchuser");
const JWT_SECRET="HARSHHERE"

//Route 1:Create a usser using post "/api/auth/createUser".Does'nt require auth

router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be at least 5 character").isLength({ min: 5 })
], async (req, res) => {
    // console.log(req.body);
    // const user=new User(req.body);
    // user.save();
    // res.send(req.body);
    //If there are errors return the errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({ success,errors: errors.array() })
    }
    // check wether the user with this email already exits
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(404 ).json({success, error: "Sorry the user with this email already exists" })
        }
        //Create a new user
        const salt=await bcrypt.genSalt(10);
        secPass= await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=  jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
        // res.json({ user });
        //Catch error
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:"Please enter unique value",message:reportError.message})});
    // res.send(req.body);
})
 
// Route 2:Authenticate a User using post "api/auth/login"
router.post('/login',[
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password can not be blancked").exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){ 
        return res.status(400).json({errors: errors.array()})
    }
    const {email,password}= req.body;
    // console.log(password);
    try{
        let user= await User.findOne({email})
        // console.log(user.body.password);
        if(!user){
            return res.status(404).json({error:"Please try with current credentials"})
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false
            return res.status(404).json({success,error:"Please try with current credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        
        const authtoken=  jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error ");
    }
    
})
// Route 3: get logged in user details using :Post "api/auth/register".login required
router.post('/getuser',fetchuser, async (req, res) => {
try {
    const userId=req.user.id;
    const user =await User.findById(userId).select("-password");
    res.send({user});
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error ");
}
})
module.exports = router