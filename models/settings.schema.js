const mongoose = require("mongoose");

const PeackOffPriceSchemaSchema = new mongoose.Schema({
  isEnabled: { type: Boolean, default: false },
  percentage: { type: Number, default: 0 },
});

const PeackOffPriceSchema = mongoose.model(
  "PeackOffPriceSchema",
  PeackOffPriceSchemaSchema
);
module.exports = { PeackOffPriceSchema };
