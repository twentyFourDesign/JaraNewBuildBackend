const {daypassBooking } = require("../models/overnight.booking.schema");
const { ErrorResponse,asyncErrorHandler }=require( "../middlewares/error/error");


const createBooking = asyncErrorHandler(async(req,res)=>{
    let {guestCount,guestDetails,roomDetails} = req.body
    let create = await daypassBooking.create({totalGuest:guestCount,bookingDetails:roomDetails,guestDetails:guestDetails})
    res.status(200).json(create)
})

const getAllBooking = asyncErrorHandler(async(req,res)=>{
    let allBooking = await daypassBooking.find({}).sort({createdAt:-1})
    res.status(200).json(allBooking)
})


module.exports = {createBooking,getAllBooking}