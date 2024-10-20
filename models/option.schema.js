const mongoose = require("mongoose");

const optionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    weekDayPrice: { type: Number, required: true },
    weekendPrice: { type: Number, required: true },
    seasonPrice: { type: Number, required: true },
    urgetCharges: { type: Number },
  },
  { timestamps: true }
);

const DaypassOption = mongoose.model(
  "DaypassOption",
  optionSchema,
  "DaypassOption"
);
module.exports = DaypassOption;
