const mongoose = require("mongoose");

const SeasonalSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Seasonal", SeasonalSchema);
