const mongoose = require("mongoose");

const daypassExtension = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const DaypassExtension = mongoose.model(
  "DaypassExtension",
  daypassExtension,
  "DaypassExtension"
);
module.exports = DaypassExtension;
