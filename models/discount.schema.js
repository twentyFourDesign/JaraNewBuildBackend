const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    code:{type:String,required:true},
    percentage:{type:String,required:true},
    expires:{type:String,required:true},
    roomNo:{type:String},
    days:{type:String,required:true},
},{timestamps:true})

const Discount = mongoose.model('Discount',discountSchema,'Discount')
module.exports = Discount