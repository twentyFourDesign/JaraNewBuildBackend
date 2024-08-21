const mongoose = require("mongoose");

const discountSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    percentage: { type: Number, required: true },
    expires: { type: Date, required: true },
    roomNo: { type: String },
    days: { type: String, required: true },
  },
  { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema, "Discount");
module.exports = Discount;
