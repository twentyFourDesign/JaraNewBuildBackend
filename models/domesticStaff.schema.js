const mongoose = require("mongoose");

const domesticStaff = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    // type: {
    //   type: String,
    //   default: "domestic",
    // },
  },
  { timestamps: true }
);

const Domestic = mongoose.model("Domestic", domesticStaff, "Domestic");
module.exports = Domestic;
