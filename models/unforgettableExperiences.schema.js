const mongoose = require("mongoose");

const unforgettableSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

const Unforgettable = mongoose.model(
  "Unforgettable",
  unforgettableSchema,
  "Unforgettable"
);
module.exports = Unforgettable;