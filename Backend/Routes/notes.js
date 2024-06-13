const express=require('express')
const router =express.Router()
const fetchuser=require("../Middleware/fetchuser");
const Note = require('../Models/Note')

const { body, validationResult } = require('express-validator');
// Route 1:Get all the notes "api/auth/login"
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes= await Note.find({user:req.user.id})
        
         res.json(notes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error ");
        
    }
})
// Route 1:Add a new node using post "
router.post('/addnote',fetchuser,[
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 letters ").isLength({min:5}),
    body('tag', "Add a tag bud").isLength({min:5}),
],async (req,res)=>{
    try {
        const errors = validationResult(req);
        const {title,description,tag}=req.body;
        console.log(req.body)
        if (!errors.isEmpty()) { 
            return res.status(400).json({ errors: errors.array() })
        }
        
        const note=new Note({
         title,description,tag,user:req.user.id
        })
        const savenote=await note.save();
         res.json(savenote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error ");
        
    }
})
// Route 3:Update an existing not using put"
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
    const {title,description,tag}=req.body;

    //Create a new node object
    const newnode={};
    if(title){newnode.title=title}
    if(description){newnode.description=description}
    if(tag){newnode.tag=tag}

    //find the node to be updated by id
    let note= await Note.findById(req.params.id);
    if(!note){
        res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){ 
        return res.status(401).send("Not allowed")
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newnode},{new:true})
    res.json(note);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error ");
    
}

})

// Route 3:delete an existing not using delete"
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    //We use try catch if henever mongodb is down then we should get the error in catch part inspite of getting any random error
    try {
    

    //find the node to be deleted by id
    let note= await Note.findById(req.params.id);
    if(!note){
        response.status(404).send("Not found");
    }
    //Allow deletion only if user owns this notes
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }

    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Sucess":"Node has been deleted",note:note});
}catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error ");
        
    }
})

module.exports=router