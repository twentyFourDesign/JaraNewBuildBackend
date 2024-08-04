const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");
const { guestModel } = require("../models");
const { statusCode } = require("../utils/statusCode");

const createGuest = asyncErrorHandler(async (req, res) => {
  // let {name,gender,email,mobile,member,birthdayReminded} = req.body
  let guestData = req.body;
  // if (req.file) {
  //   guestData.photo = req.file.path;
  // }
  let createGuest = await guestModel.create(guestData);
  if (createGuest) {
    res.status(statusCode.accepted).json(createGuest);
  } else {
    throw new ErrorResponse({ message: "Failed To Create Guest" });
  }
});

const getGuest = asyncErrorHandler(async (req, res) => {
  let allGuest = await guestModel.find({}).sort({ createdAt: -1 });
  if (allGuest.length > 0) {
    res.status(statusCode.accepted).json(allGuest);
  } else {
    throw new ErrorResponse("No Guest Found", 404);
  }
});

const getSingle = asyncErrorHandler(async (req, res) => {
  let guest = await guestModel.findById(req.params.id);
  if (!guest) {
    res.status(statusCode.accepted).json(guest);
  } else {
    throw new ErrorResponse({ message: "No Guest Found" });
  }
});
const getGuestByEmail = asyncErrorHandler(async (req, res) => {
  let guest = await guestModel.findOne({ email: req.params.email });
  if (guest) {
    res.status(statusCode.accepted).json(guest);
  } else {
    res.status(404).json({ message: "Guest not found" });
  }
});

module.exports = { createGuest, getGuest, getSingle, getGuestByEmail };
