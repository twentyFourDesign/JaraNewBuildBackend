const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    name:{type:String,required:true},
    amount:{type:String,required:true},
    status:{type:String,required:true},
    ref:{type:String},
},{timestamps:true})

const Payment = mongoose.model('Payment',paymentSchema,'Payment')
module.exports = Payment