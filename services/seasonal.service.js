const Seasonal = require("../models/seasonal.schema");
const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");

const getAllSeasonal = asyncErrorHandler(async (req, res) => {
  const seasonalDates = await Seasonal.find({});
  if (seasonalDates.length > 0) {
    res.status(200).json(seasonalDates);
  } else {
    throw new ErrorResponse("No seasonal dates found", 404);
  }
});

const createSeasonal = asyncErrorHandler(async (req, res) => {
  const { date, description } = req.body;
  const newSeasonalDate = new Seasonal({ date, description });
  await newSeasonalDate.save();
  if (newSeasonalDate) {
    res.status(201).json(newSeasonalDate);
  } else {
    throw new ErrorResponse("No seasonal dates found", 404);
  }
});

const updateSeasonal = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { date, description } = req.body;
  const seasonalDate = await Seasonal.findByIdAndUpdate(id, {
    date,
    description,
  });
  if (seasonalDate) {
    res.status(200).json(seasonalDate);
  } else {
    throw new ErrorResponse("Seasonal date not found", 404);
  }
});

const deleteSeasonal = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const seasonalDate = await Seasonal.findByIdAndDelete(id);

  if (seasonalDate) {
    res.status(200).json({ message: "Seasonal date deleted" });
  } else {
    throw new ErrorResponse("Seasonal date not found", 404);
  }
});

module.exports = {
  getAllSeasonal,
  createSeasonal,
  deleteSeasonal,
  updateSeasonal,
};
