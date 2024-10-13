const mongoose = require("mongoose");

const ridingSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    // type: {
    //   type: String,
    //   default: "riding",
    // },
  },
  { timestamps: true }
);

const Riding = mongoose.model("Riding", ridingSchema, "Riding");
module.exports = Riding;
