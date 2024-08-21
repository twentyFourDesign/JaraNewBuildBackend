const mongoose = require("mongoose");

const daypassVoucherSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    balance: { type: Number, required: true },
    // percentage:{type:Number,required:true},
    expireAt: { type: Date, required: true },
    startsAt: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const DaypassVoucher = mongoose.model(
  "DaypassVoucher",
  daypassVoucherSchema,
  "DaypassVoucher"
);
module.exports = DaypassVoucher;
