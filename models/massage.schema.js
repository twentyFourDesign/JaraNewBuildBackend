const mongoose = require("mongoose");

const massageSchema = mongoose.Schema({
    type:{type:String,required:true},
    price:{type:String,required:true},
    duration:{type:String,required:true}
},{timestamps:true})

const Massage = mongoose.model('Massage',massageSchema,'Massage')
module.exports = Massage