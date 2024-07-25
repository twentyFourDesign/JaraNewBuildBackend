const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    
    role:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profile:{type:String,default:""},
    otp:{type:Number,default:null},
    verified:{type:Boolean,default:true},
    expiredIn:{type:Date,default:null}

},{timestamps:true})

const account = new mongoose.model("Account",accountSchema,"Account")
module.exports = account