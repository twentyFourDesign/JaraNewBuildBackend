const { asyncErrorHandler, ErrorResponse } = require("../middlewares/error/error");
const { disableModel } = require("../models");
const { statusCode } = require("../utils/statusCode");


const create = asyncErrorHandler(async (req, res) => {
    let createDaypass = await disableModel.create(req.body)
    if (createDaypass) {
        res.status(statusCode.accepted).json(createDaypass)
    }
    else {
        throw new ErrorResponse("Failed To Create Payment", 404)
    }
})


const getAll = asyncErrorHandler(async (req, res) => {
    let allDaypass = await disableModel.find({})
    if (allDaypass.length > 0) { res.status(statusCode.accepted).json(allDaypass) }
    else { throw new ErrorResponse("No Massage Found", 404) }
})

const del = asyncErrorHandler(async (req, res) => {
    let allDaypass = await disableModel.findByIdAndDelete(req.params.id)
    if (allDaypass) { res.status(statusCode.accepted).json({ msg: "DELETED" }) }
    else { throw new ErrorResponse("No Massage Found", 404) }
})




module.exports = { create, getAll, del }