const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema({
    code:{type:String,required:true},
    amount:{type:String,required:true},
    balance:{type:String,required:true},
    startsAt:{type:String},
    expireAt:{type:String,required:true},
    status:{type:String,required:true},

},{timestamps:true})

const Voucher = mongoose.model('Voucher',voucherSchema,'Voucher')
module.exports = Voucher