const mongoose = require("mongoose");

const lookOutSchema = mongoose.Schema({
    breakfastShell:{type:Number,default:0},
    breakfastHorse:{type:Number,default:0},
    breakfastFish:{type:Number,default:0},
    luchShell:{type:Number,default:0},
    luchHorse:{type:Number,default:0},
    luchFish:{type:Number,default:0},
    dinnerChampagne:{type:Number,default:0},
    dinnerRomantic :{type:Number,default:0},
    dinnerFish:{type:Number,default:0},

},{timestamps:true})

const LookOut = mongoose.model('LookOut',lookOutSchema,'LookOut')
module.exports = LookOut