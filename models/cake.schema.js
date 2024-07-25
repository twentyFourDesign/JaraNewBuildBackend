const mongoose = require("mongoose");

const cakeSchema = mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:String,required:true},
},{timestamps:true})

const Cake = mongoose.model('Cake',cakeSchema,'Cake')
module.exports = Cake