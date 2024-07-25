const mongoose = require ("mongoose")


const overNightBookingSchema = mongoose.Schema({
    totalGuest:{type:Object,required:true},
    bookingDetails:{type:Object,required:true},
    guestDetails:{type:Object,required:true},
},{timestamps:true})


const daypassBookingSchema = mongoose.Schema({
    totalGuest:{type:Object,required:true},
    bookingDetails:{type:Object,required:true},
    guestDetails:{type:Object,required:true},
},{timestamps:true})


const daypassBooking = mongoose.model("daypassBooking",daypassBookingSchema,"daypassBooking")
const overnightBooking = mongoose.model("overnightBooking",overNightBookingSchema,"overnightBooking")


module.exports = {overnightBooking,daypassBooking}
