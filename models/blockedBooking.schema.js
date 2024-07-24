const mongoose = require("mongoose");

const blockedSchema = mongoose.Schema({
    date:{type:Date,required:true},
},{timestamps:true})

const BlockedDaypass = mongoose.model('BlockedDaypass',blockedSchema,'BlockedDaypass')
module.exports = BlockedDaypass