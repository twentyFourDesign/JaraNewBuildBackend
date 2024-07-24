const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    type:{type:String,required:true},
    price:{type:String,required:true},
},{timestamps:true})

const Room = mongoose.model('Room',roomSchema,'Room')
module.exports = Room