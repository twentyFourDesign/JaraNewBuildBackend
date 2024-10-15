const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");
const DiningExperience = require("../models/diningExperience.schema");
const { statusCode } = require("../utils/statusCode");

const create = asyncErrorHandler(async (req, res) => {
  let createDaypass = await DiningExperience.create(req.body);
  if (createDaypass) {
    res.status(statusCode.accepted).json(createDaypass);
  } else {
    throw new ErrorResponse("Failed To Create Dining", 404);
  }
});

const update = asyncErrorHandler(async (req, res) => {
  let { title, price, typeOf } = req.body;
  let findMassage = await DiningExperience.findById(req.params.id);
  let updatedbody = {
    title: title ? title : findMassage.title,
    price: price ? price : findMassage.price,
    typeOf: typeOf ? typeOf : findMassage.typeOf,
  };
  let updateData = await DiningExperience.findByIdAndUpdate(
    req.params.id,
    updatedbody
  );
  if (updateData) {
    res.status(statusCode.accepted).json(updateData);
  } else {
    throw new ErrorResponse("Failed To Update Dining Experience", 404);
  }
});

const getAll = asyncErrorHandler(async (req, res) => {
  let allDaypass = await DiningExperience.find({});
  if (allDaypass.length > 0) {
    res.status(statusCode.accepted).json(allDaypass);
  } else {
    throw new ErrorResponse("No Dining Found", 404);
  }
});

const del = asyncErrorHandler(async (req, res) => {
  let allDaypass = await DiningExperience.findByIdAndDelete(req.params.id);
  if (allDaypass) {
    res.status(statusCode.accepted).json({ msg: "DELETED" });
  } else {
    throw new ErrorResponse("No Dining Found", 404);
  }
});

module.exports = { create, getAll, del, update };
