const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { massageModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const create = asyncErrorHandler(async(req,res)=>{
    let createDaypass = await massageModel.create(req.body)
    if(createDaypass){
        res.status(statusCode.accepted).json(createDaypass)
    }
    else{
        throw new ErrorResponse("Failed To Create Payment",404)
    }
})

const update = asyncErrorHandler(async(req,res)=>{

    let {type,duration,price} = req.body
    let findMassage = await massageModel.findById(req.params.id)
    let updatedbody = {
        type:type ? type : findMassage.type,
        duration:duration ? duration : findMassage.duration,
        price:price ? price : findMassage.price

    }
    let updateData = await massageModel.findByIdAndUpdate(req.params.id,updatedbody)
    if(updateData){
        res.status(statusCode.accepted).json(updateData)
    }
    else{
        throw new ErrorResponse("Failed To Update Massage",404)
    }
})

const getAll = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await massageModel.find({})
    if(allDaypass.length>0) {res.status(statusCode.accepted).json(allDaypass)}
    else {throw new ErrorResponse("No Massage Found",404)}
})

const del = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await massageModel.findByIdAndDelete(req.params.id)
    if(allDaypass) {res.status(statusCode.accepted).json({msg:"DELETED"})}
    else {throw new ErrorResponse("No Massage Found",404)}
})




module.exports = { create, getAll, del,update}