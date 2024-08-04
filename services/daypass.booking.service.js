const { daypassBooking } = require("../models/overnight.booking.schema");
const {
  ErrorResponse,
  asyncErrorHandler,
} = require("../middlewares/error/error");

const createBooking = asyncErrorHandler(async (req, res) => {
  let { guestCount, guestDetails, roomDetails } = req.body;
  guestDetails = JSON.parse(guestDetails);
  roomDetails = JSON.parse(roomDetails);
  const file = req.file;
  const fileUrl = file
    ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    : null;
  const updatedGuestDetails = {
    ...guestDetails,
    photo: fileUrl,
  };
  let create = await daypassBooking.create({
    totalGuest: guestCount,
    bookingDetails: roomDetails,
    guestDetails: updatedGuestDetails,
  });
  res.status(200).json(create);
});

const getAllBooking = asyncErrorHandler(async (req, res) => {
  let allBooking = await daypassBooking.find({}).sort({ createdAt: -1 });
  res.status(200).json(allBooking);
});
const getBookingByRef = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;
  const booking = await daypassBooking.findOne({ _id: ref });
  if (!booking) {
    throw new ErrorResponse("Booking not found", 404);
  }
  res.status(200).json(booking);
});

module.exports = { createBooking, getAllBooking, getBookingByRef };
