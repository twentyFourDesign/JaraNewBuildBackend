const mongoose = require("mongoose");

const optionSchema = mongoose.Schema(
  {
    adultsAlcoholic: {
      weekDayPrice: { type: Number, required: true },
      weekendPrice: { type: Number, required: true },
      seasonalPrice: { type: Number, required: true },
    },
    adultsNonAlcoholic: {
      weekDayPrice: { type: Number, required: true },
      weekendPrice: { type: Number, required: true },
      seasonalPrice: { type: Number, required: true },
    },
    nanny: {
      weekDayPrice: { type: Number, required: true },
      weekendPrice: { type: Number, required: true },
      seasonalPrice: { type: Number, required: true },
    },
    childTotal: {
      weekDayPrice: { type: Number, required: true },
      weekendPrice: { type: Number, required: true },
      seasonalPrice: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const DaypassOption = mongoose.model("DaypassOption", optionSchema);
module.exports = DaypassOption;
