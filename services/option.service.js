const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { optionModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const create = asyncErrorHandler(async(req,res)=>{
    let createDaypass = await optionModel.create(req.body)
    if(createDaypass){
        res.status(statusCode.accepted).json(createDaypass)
    }
    else{
        throw new ErrorResponse("Failed To Create Payment",404)
    }
})

const update = asyncErrorHandler(async(req,res)=>{


    let {name,description,weekDayPrice,weekendPrice,seasonPrice,urgetCharges} = req.body
    let findMassage = await optionModel.findById(req.params.id)
    let updatedbody = {
        name:name ? name : findMassage.urgetCharges,
        description:description ? description : findMassage.description,
        weekDayPrice:weekDayPrice ? weekDayPrice : findMassage.weekDayPrice,
        weekendPrice:weekendPrice ? weekendPrice : findMassage.weekendPrice,
        seasonPrice:seasonPrice ? seasonPrice : findMassage.seasonPrice,
        urgetCharges:urgetCharges ? urgetCharges : findMassage.urgetCharges

    }
    let updateData = await optionModel.findByIdAndUpdate(req.params.id,updatedbody)
    if(updateData){
        res.status(statusCode.accepted).json(updateData)
    }
    else{
        throw new ErrorResponse("Failed To Update Massage",404)
    }
})

const getAll = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await optionModel.find({})
    if(allDaypass.length>0) {res.status(statusCode.accepted).json(allDaypass)}
    else {throw new ErrorResponse("No Massage Found",404)}
})

const del = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await optionModel.findByIdAndDelete(req.params.id)
    if(allDaypass) {res.status(statusCode.accepted).json({msg:"DELETED"})}
    else {throw new ErrorResponse("No Massage Found",404)}
})




module.exports = { create, getAll, del,update}