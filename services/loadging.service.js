const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { loadginModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const create = asyncErrorHandler(async(req,res)=>{
    if(req.body.id){
        let find = await loadginModel.findById(req.body.id)
        let updatedBody  = {
            driver:req.body.driver ? req.body.driver : find.driver,
            nany:req.body.nany ? req.body.nany : find.nany
        }
        let update = await loadginModel.findByIdAndUpdate(req.body.id,updatedBody)
        if(update){
            res.status(statusCode.accepted).json(update)
        }

    }
    else{
        let create = await loadginModel.create(req.body)
        if(create){
            res.status(statusCode.accepted).json(create)
        }
        else{
            throw new ErrorResponse("Failed To Create Loadigng",404)
        }

    }
})

const getAll = asyncErrorHandler(async(req,res)=>{
    let allDaypass = await loadginModel.find({})
    if(allDaypass.length>0) {res.status(statusCode.accepted).json(allDaypass)}
    else {throw new ErrorResponse("No Payment Found",404)}
})


module.exports = { create, getAll}