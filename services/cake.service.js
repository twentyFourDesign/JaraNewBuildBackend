const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { cakeModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const create = asyncErrorHandler(async(req,res)=>{
    let createCake = await cakeModel.create(req.body)
    if(createCake){
        res.status(statusCode.accepted).json(createCake)
    }
    else{
        throw new ErrorResponse("Failed To Create Cake",404)
    }
})

const update = asyncErrorHandler(async(req,res)=>{

    let {title,desc,price} = req.body
    let findCake = await cakeModel.findById(req.params.id)
    let updatedbody = {
        title:title ? title : findCake.type,
        desc:desc ? desc : findCake.desc,
        price:price ? price : findCake.price

    }
    let updateData = await cakeModel.findByIdAndUpdate(req.params.id,updatedbody)
    if(updateData){
        res.status(statusCode.accepted).json(updateData)
    }
    else{
        throw new ErrorResponse("Failed To Update Cake",404)
    }
})

const getAll = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await cakeModel.find({})
    if(allDaypass.length>0) {res.status(statusCode.accepted).json(allDaypass)}
    else {throw new ErrorResponse("No Cake Found",404)}
})

const del = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await cakeModel.findByIdAndDelete(req.params.id)
    if(allDaypass) {res.status(statusCode.accepted).json({msg:"DELETED"})}
    else {throw new ErrorResponse("No Cake Found",404)}
})


module.exports = { create, getAll,del,update}