const express=require("express");
const fs=require("fs");
const bodyparser=require("body-parser");
const cors=require("cors");
const app=express();
const connect=require("./connection/connection");
const Upload=require("./models/Upload");
const multer  = require('multer')
connect();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//storing local destination and filename while storing
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname+"---"+Date.now());
    }
  })
//uploading image in folder
  const upload = multer({ storage: storage })
//multer middlewear

app.post("/upload",upload.single("presentImage"),async (req,res)=>{
 
    try{
      
        const data=await Upload.create({
            name:req.body.name,
            location:req.body.location,
            description:req.body.description,
            image:{
                data:fs.readFileSync("images/"+req.file.filename),
                contentType:"image/png"
            }
        })
        res.status(200).json(data);
            
    }
    catch(e){
      res.status(400).json({
        status:"failed",
        message:e.message
      })
    }
})

app.get("/uploaddetails",async (req,res)=>{
  try{

    const postdatas=await Upload.find();
    res.status(200).json(postdatas)
  }
  catch(e){
    res.status(400).json(
      {message:e.message}
    )
  }
})














app.listen(process.env.PORT || 5000,()=>{console.log("server is up")})