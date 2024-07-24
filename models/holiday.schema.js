const mongoose = require("mongoose");

const holidaySchema = mongoose.Schema({
    date:{type:Date,required:true},
},{timestamps:true})

const Holiday = mongoose.model('Holiday',holidaySchema,'Holiday')
module.exports = Holiday