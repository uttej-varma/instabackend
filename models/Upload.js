const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const uploadSchema = new Schema({
 name:{type:String},
 location:{type:String},
 description:{type:String},
 likes:{type:Number,default:0},
 date:{type:String,default:"18 jan 2022"},
 image:{
    data:Buffer,
    contentType : String
    
 }
},{timestamps:Date});

const instaModel = mongoose.model('UserPost', uploadSchema);

module.exports=instaModel;