const { staffModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const { ErrorResponse, asyncErrorHandler } = require("../middlewares/error/error");

const createStaff = asyncErrorHandler(async (req, res) => {
    let staffInfo = await staffModel.create(req.body)
    res.status(200).json(staffInfo)

})


const getSingle = asyncErrorHandler(async (req, res) => {
    let userDeatils = await staffModel.findById(req.params.id)
    if (!userDeatils) {
        throw new ErrorResponse("Invalid Id", statusCode.notFound)
    }
    else {
        res.status(200).json(userDeatils)
    }
})

const getAll= asyncErrorHandler(async (req, res) => {
    let staff = await staffModel.find({})
    if (!staff) {
        throw new ErrorResponse("No Stff", statusCode.notFound)
    }
    else {
        res.status(200).json(staff)
    }
})


const updateStaff = asyncErrorHandler(async (req, res) => {
    let staffInfo = await staffModel.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json(staffInfo)
})

const deleteStaff = asyncErrorHandler(async (req, res) => {
    let deleteAccount = await staffModel.findByIdAndDelete(req.params.id)
    if (!deleteAccount) {
        throw new ErrorResponse("Invalid Id", statusCode.notFound)
    }
    else {
        res.status(200).json({ msg: "Account Deleted" })
    }
})





module.exports = { createStaff, getSingle, updateStaff, deleteStaff,getAll }