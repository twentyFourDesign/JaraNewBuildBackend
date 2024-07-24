const mongoose = require("mongoose");

const drinkSchema = mongoose.Schema({
    title:{type:String,required:true},
    price:{type:String,required:true},
},{timestamps:true})

const Drink = mongoose.model('Drink',drinkSchema,'Drink')
module.exports = Drink