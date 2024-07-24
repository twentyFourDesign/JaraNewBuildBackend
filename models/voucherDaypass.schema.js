const mongoose = require("mongoose");

const daypassVoucherSchema = mongoose.Schema({
    code:{type:String,required:true},
    amount:{type:String,required:true},
    balance:{type:String,required:true},
    percentage:{type:String,required:true},
    expires:{type:String,required:true},
    startsAt:{type:String,required:true},
    status:{type:String,required:true},
},{timestamps:true})

const DaypassVoucher = mongoose.model('DaypassVoucher',daypassVoucherSchema,'DaypassVoucher')
module.exports = DaypassVoucher