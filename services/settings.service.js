const { PeackOffPriceSchema } = require("../models/settings.schema"); // Assuming you have a settings schema

const createPeackOffPriceSetting = async (req, res) => {
  const { isEnabled, percentage } = req.body;
  const peak = new PeackOffPriceSchema({ isEnabled, percentage });
  await peak.save();
  if (peak) {
    res.status(201).json(peak);
  } else {
    throw new ErrorResponse("No seasonal dates found", 404);
  }
};

const getPeakOffPriceSetting = async (req, res) => {
  const setting = await PeackOffPriceSchema.findOne(); // Fetch the PeackOffPriceSchema
  res.status(200).json(setting);
};

const setPeakOffPriceSetting = async (req, res) => {
  const { isEnabled, percentage } = req.body;
  await PeackOffPriceSchema.findOneAndUpdate(
    {},
    { isEnabled, percentage },
    { upsert: true }
  ); // Upsert the PeackOffPriceSchema
  res.status(200).json({ message: "PeackOffPriceSchema updated successfully" });
};

module.exports = {
  getPeakOffPriceSetting,
  setPeakOffPriceSetting,
  createPeackOffPriceSetting,
};
