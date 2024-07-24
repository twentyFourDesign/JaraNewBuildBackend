const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { guestModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const createGuest = asyncErrorHandler(async(req,res)=>{
    // let {name,gender,email,mobile,member,birthdayReminded} = req.body
    let createGuest = await guestModel.create(req.body)
    if(createGuest){
        res.status(statusCode.accepted).json(createGuest)
    }
    else{
        throw new ErrorResponse({message:"Failed To Create Guest"})
    }
})

const getGuest = asyncErrorHandler(async(req,res)=>{
    let allGuest = await guestModel.find({}).sort({createdAt:-1})
    if(allGuest.length>0) {res.status(statusCode.accepted).json(allGuest)}
    else {throw new ErrorResponse("No Guest Found",404)}
})


const getSingle = asyncErrorHandler(async(req,res)=>{
    let guest = await guestModel.findById(req.params.id)
    if(!guest) {res.status(statusCode.accepted).json(guest)}
    else {throw new ErrorResponse({message:"No Guest Found"})}
})


module.exports = { createGuest, getGuest, getSingle}