const mongoose = require("mongoose");

const loadgingSchema = mongoose.Schema({
    driver:{type:String,required:true},
    nany:{type:String,required:true},
},{timestamps:true})

const Loadging = mongoose.model('Loadging',loadgingSchema,'Loadging')
module.exports = Loadging