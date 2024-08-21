const { dayPassVouherModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const {
  ErrorResponse,
  asyncErrorHandler,
} = require("../middlewares/error/error");

const createDiscount = asyncErrorHandler(async (req, res) => {
  let staffInfo = await dayPassVouherModel.create(req.body);
  res.status(200).json(staffInfo);
});

const getAll = asyncErrorHandler(async (req, res) => {
  let voucher = await dayPassVouherModel.find({});
  if (!voucher) {
    throw new ErrorResponse("No Discount", statusCode.notFound);
  } else {
    res.status(200).json(voucher);
  }
});

const deleteDiscount = asyncErrorHandler(async (req, res) => {
  let deletevoucher = await dayPassVouherModel.findByIdAndDelete(req.params.id);
  if (!deletevoucher) {
    throw new ErrorResponse("Invalid Id", statusCode.notFound);
  } else {
    res.status(200).json({ msg: "Discount Deleted" });
  }
});

const validateVoucher = asyncErrorHandler(async (req, res) => {
  const { code, price } = req.body;
  let voucher = await dayPassVouherModel.findOne({ code });
  if (!voucher) {
    throw new ErrorResponse("Invalid Voucher Code", statusCode.notFound);
  } else if (new Date(voucher.expireAt) < new Date()) {
    throw new ErrorResponse("Voucher has expired", statusCode.badRequest);
  } else if (voucher.balance <= 0) {
    throw new ErrorResponse(
      "Voucher has been fully used",
      statusCode.badRequest
    );
  } else {
    let newPrice = price;
    if (price >= voucher.balance) {
      newPrice = price - voucher.balance;
    } else if (price < voucher.balance) {
      newPrice = 0;
    }
    let remainingBalance = voucher.balance - price;
    if (remainingBalance < 0) {
      remainingBalance = 0;
    }

    voucher.balance = remainingBalance;
    await voucher.save();
    res.status(200).json({ voucher, newPrice });
  }
});
module.exports = { createDiscount, getAll, deleteDiscount, validateVoucher };
