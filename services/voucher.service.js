const { voucherModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const { ErrorResponse, asyncErrorHandler } = require("../middlewares/error/error");

const createVoucher = asyncErrorHandler(async (req, res) => {
    let staffInfo = await voucherModel.create(req.body)
    res.status(200).json(staffInfo)
})

const getAll= asyncErrorHandler(async (req, res) => {
    let voucher = await voucherModel.find({})
    if (!voucher) {
        throw new ErrorResponse("No Voucher", statusCode.notFound)
    }
    else {
        res.status(200).json(voucher)
    }
})



const deleteVoucher = asyncErrorHandler(async (req, res) => {
    let deletevoucher = await voucherModel.findByIdAndDelete(req.params.id)
    if (!deletevoucher) {
        throw new ErrorResponse("Invalid Id", statusCode.notFound)
    }
    else {
        res.status(200).json({ msg: "Voucher Deleted" })
    }
})





module.exports = {createVoucher,getAll,deleteVoucher }