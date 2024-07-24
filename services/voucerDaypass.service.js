const { dayPassVouherModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const { ErrorResponse, asyncErrorHandler } = require("../middlewares/error/error");

const createDiscount = asyncErrorHandler(async (req, res) => {
    let staffInfo = await dayPassVouherModel.create(req.body)
    res.status(200).json(staffInfo)
})

const getAll= asyncErrorHandler(async (req, res) => {
    let voucher = await dayPassVouherModel.find({})
    if (!voucher) {
        throw new ErrorResponse("No Discount", statusCode.notFound)
    }
    else {
        res.status(200).json(voucher)
    }
})



const deleteDiscount = asyncErrorHandler(async (req, res) => {
    let deletevoucher = await dayPassVouherModel.findByIdAndDelete(req.params.id)
    if (!deletevoucher) {
        throw new ErrorResponse("Invalid Id", statusCode.notFound)
    }
    else {
        res.status(200).json({ msg: "Discount Deleted" })
    }
})


module.exports = {createDiscount,getAll,deleteDiscount }