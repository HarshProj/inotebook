const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook"
// mongodb://localhost:27017/inotebook?readPreference=primary&appName=MogoDB%252Compass&tls=false&directConnection=true

const connectToMongo=async()=>{
    mongoose.connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        // console.log("Connected to mongoose succesfully");
    })
    mongoose.connection
    .once("open",()=> console.log("connected"))
    .on("error",error =>{
        console.log("your error",error);
    });
} 

module.exports=connectToMongo;