const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");
const { massageModel } = require("../models");
const { statusCode } = require("../utils/statusCode");

const createMassage = asyncErrorHandler(async (req, res) => {
  let { title, duration, price } = req.body;
  if (!title || !duration || !price) {
    throw new ErrorResponse("Title, Duration, and Price are required", 400);
  }
  let createMassage = await massageModel.create({ title, duration, price });
  if (createMassage) {
    res.status(statusCode.accepted).json(createMassage);
  } else {
    throw new ErrorResponse("Failed To Create Massage", 404);
  }
});

const update = asyncErrorHandler(async (req, res) => {
  let { title, duration, price } = req.body;
  let findMassage = await massageModel.findById(req.params.id);
  let updatedbody = {
    title: title ? title : findMassage.title,
    duration: duration ? duration : findMassage.duration,
    price: price ? price : findMassage.price,
  };
  let updateData = await massageModel.findByIdAndUpdate(
    req.params.id,
    updatedbody
  );
  if (updateData) {
    res.status(statusCode.accepted).json(updateData);
  } else {
    throw new ErrorResponse("Failed To Update Massage", 404);
  }
});

const getAll = asyncErrorHandler(async (req, res) => {
  let allDaypass = await massageModel.find({});
  if (allDaypass.length > 0) {
    res.status(statusCode.accepted).json(allDaypass);
  } else {
    throw new ErrorResponse("No Massage Found", 404);
  }
});

const del = asyncErrorHandler(async (req, res) => {
  let allDaypass = await massageModel.findByIdAndDelete(req.params.id);
  if (allDaypass) {
    res.status(statusCode.accepted).json({ msg: "DELETED" });
  } else {
    throw new ErrorResponse("No Massage Found", 404);
  }
});

module.exports = { createMassage, getAll, del, update };
