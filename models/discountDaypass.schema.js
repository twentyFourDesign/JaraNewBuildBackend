const mongoose = require("mongoose");

const daypassDiscountSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    percentage: { type: Number, required: true },
    expires: { type: Date, required: true },
    days: { type: String, required: true },
  },
  { timestamps: true }
);

const DaypassDiscount = mongoose.model(
  "DaypassDiscount",
  daypassDiscountSchema,
  "DaypassDiscount"
);
module.exports = DaypassDiscount;
