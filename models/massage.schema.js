const mongoose = require("mongoose");

const massageSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    // type: {
    //   type: String,
    //   default: "massage",
    // },
  },
  { timestamps: true }
);

const Massage = mongoose.model("Massage", massageSchema, "Massage");
module.exports = Massage;
