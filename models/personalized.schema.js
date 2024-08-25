const mongoose = require("mongoose");

const personalizedSchema = mongoose.Schema(
  {
    welcomeNote: { type: String, required: true },
    flowerPetals: { type: String, required: true },
    baloons: { type: String, required: true },
    floatingBreakFast: { type: String, required: true },
    sunsetPicnic: { type: String, required: true },
    DIYPainting: { type: String, required: true },
    TieDye: { type: String, required: true },
  },
  { timestamps: true }
);

const Personalized = mongoose.model(
  "Personalized",
  personalizedSchema,
  "Personalized"
);
module.exports = Personalized;
