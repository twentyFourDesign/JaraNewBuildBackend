const { voucherModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const {
  ErrorResponse,
  asyncErrorHandler,
} = require("../middlewares/error/error");

const createVoucher = asyncErrorHandler(async (req, res) => {
  let staffInfo = await voucherModel.create(req.body);
  if (!staffInfo) {
    throw new ErrorResponse("Failed To Create Voucher", statusCode.badRequest);
  }
  res.status(200).json(staffInfo);
});

const getAll = asyncErrorHandler(async (req, res) => {
  let voucher = await voucherModel.find({});
  if (!voucher) {
    throw new ErrorResponse("No Voucher", statusCode.notFound);
  } else {
    res.status(200).json(voucher);
  }
});

const deleteVoucher = asyncErrorHandler(async (req, res) => {
  let deletevoucher = await voucherModel.findByIdAndDelete(req.params.id);
  if (!deletevoucher) {
    throw new ErrorResponse("Invalid Id", statusCode.notFound);
  } else {
    res.status(200).json({ msg: "Voucher Deleted" });
  }
});

const validateVoucher = asyncErrorHandler(async (req, res) => {
  const { code, price } = req.body;
  let voucher = await voucherModel.findOne({ code });
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

module.exports = { createVoucher, getAll, deleteVoucher, validateVoucher };
