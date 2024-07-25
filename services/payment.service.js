const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { paymentModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const create = asyncErrorHandler(async(req,res)=>{
    // let {name,gender,email,mobile,member,birthdayReminded} = req.body
    let createDaypass = await paymentModel.create(req.body)
    if(createDaypass){
        res.status(statusCode.accepted).json(createDaypass)
    }
    else{
        throw new ErrorResponse("Failed To Create Payment",404)
    }
})

const getAll = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await paymentModel.find({})
    if(allDaypass.length>0) {res.status(statusCode.accepted).json(allDaypass)}
    else {throw new ErrorResponse("No Payment Found",404)}
})


const getSingle = asyncErrorHandler(async(req,res)=>{
    let daypass = await paymentModel.findById(req.params.id)
    if(!daypass) {res.status(statusCode.accepted).json(daypass)}
    else {throw new ErrorResponse("No Daypass Booking Found",404)}
})


module.exports = { create, getAll, getSingle}