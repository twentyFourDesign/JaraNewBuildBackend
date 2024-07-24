const mongoose = require("mongoose");

const termSchema = mongoose.Schema({
    type:{type:String,required:true},
    heading:{type:String,required:true},
    desc:{type:String,required:true},
},{timestamps:true})

const Term = mongoose.model('Term',termSchema,'Term')
module.exports = Term