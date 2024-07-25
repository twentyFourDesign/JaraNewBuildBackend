const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    gender:{type:String,required:true},
    email:{type:String},
    mobile:{type:String,required:true},
},{timestamps:true})

const Staff = mongoose.model('Staff',staffSchema,'Staff')
module.exports = Staff