const { discountModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const {
  ErrorResponse,
  asyncErrorHandler,
} = require("../middlewares/error/error");

const createDiscount = asyncErrorHandler(async (req, res) => {
  let staffInfo = await discountModel.create(req.body);
  res.status(200).json(staffInfo);
});

const getAll = asyncErrorHandler(async (req, res) => {
  let voucher = await discountModel.find({});
  if (!voucher) {
    throw new ErrorResponse("No Discount", statusCode.notFound);
  } else {
    res.status(200).json(voucher);
  }
});

const deleteDiscount = asyncErrorHandler(async (req, res) => {
  let deletevoucher = await discountModel.findByIdAndDelete(req.params.id);
  if (!deletevoucher) {
    throw new ErrorResponse("Invalid Id", statusCode.notFound);
  } else {
    res.status(200).json({ msg: "Discount Deleted" });
  }
});

const validateDiscount = asyncErrorHandler(async (req, res) => {
  const { code } = req.body;
  let discount = await discountModel.findOne({ code });
  if (!discount) {
    throw new ErrorResponse("Invalid Discount Code", statusCode.notFound);
  } else if (new Date(discount.expires) < new Date()) {
    throw new ErrorResponse("Discount has expired", statusCode.badRequest);
  } else {
    res.status(200).json(discount);
  }
});

module.exports = { createDiscount, getAll, deleteDiscount, validateDiscount };
