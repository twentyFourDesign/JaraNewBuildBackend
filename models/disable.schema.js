const mongoose = require("mongoose");

const disableSchema = mongoose.Schema({
    date:{type:Date,required:true},
    type:{type:String,required:true}
},{timestamps:true})

const Disable = mongoose.model('Disable',disableSchema,'Disable')
module.exports = Disable