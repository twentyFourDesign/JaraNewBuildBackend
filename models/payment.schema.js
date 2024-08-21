const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true },
    ref: { type: String, required: true },
    method: { type: String },
    guestDetails: { type: String },
    roomDetails: { type: String },
    subTotal: { type: String },
    vat: { type: String },
    totalCost: { type: String },
    discount: { type: Number },
    voucher: { type: Number },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema, "Payment");
module.exports = Payment;
