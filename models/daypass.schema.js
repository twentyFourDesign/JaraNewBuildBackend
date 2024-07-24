const mongoose = require("mongoose");

const daypassSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    mobile:{type:String,required:true},
    optionType:{type:String},
    totalGuest:{type:String,required:true},
    visitingDate:{type:String,required:true}
},{timestamps:true})

const DayPass = mongoose.model('DayPass',daypassSchema,'DayPass')
module.exports = DayPass