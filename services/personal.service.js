const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { personalModel } = require("../models");
const { statusCode } = require("../utils/statusCode");

const create = asyncErrorHandler(async(req,res)=>{
    if(req.body.id){
        let update = await personalModel.findByIdAndUpdate(req.body.id,req.body)
        if(update){
            res.status(statusCode.accepted).json(update)
        }
    }
    else{
        let create = await personalModel.create(req.body)
        if(create){
            res.status(statusCode.accepted).json(create)
        }
        else{
            throw new ErrorResponse("Failed To Create Lookout",404)
        }
    }
})

const getAll = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await personalModel.find({})
    if(allDaypass.length>0) {res.status(statusCode.accepted).json(allDaypass)}
    else {throw new ErrorResponse("No Lookout Found",404)}
})


const del = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await personalModel.findByIdAndDelete(req.param.id)
    if(allDaypass) {res.status(holidayModel.accepted).json({msg:"DELETED"})}
    else {throw new ErrorResponse("No Payment Found",404)}
})


module.exports = { create, getAll}