const mongoose = require("mongoose");

const daypassDiscountSchema = mongoose.Schema({
    code:{type:String,required:true},
    percentage:{type:String,required:true},
    expires:{type:String,required:true},
    days:{type:String,required:true},
},{timestamps:true})

const DaypassDiscount = mongoose.model('DaypassDiscount',daypassDiscountSchema,'DaypassDiscount')
module.exports = DaypassDiscount