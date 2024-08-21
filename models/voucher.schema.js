const mongoose = require("mongoose");

const voucherSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    startsAt: { type: Date, required: true },
    expireAt: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema, "Voucher");
module.exports = Voucher;
