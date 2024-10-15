const mongoose = require("mongoose");

const diningExperience = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    typeOf: {
      type: String,
    },
  },
  { timestamps: true }
);

const DiningExperience = mongoose.model(
  "DiningExperience",
  diningExperience,
  "DiningExperience"
);
module.exports = DiningExperience;
