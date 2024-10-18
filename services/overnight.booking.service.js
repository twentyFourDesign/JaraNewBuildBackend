const { overnightBooking } = require("../models/overnight.booking.schema");
const {
  ErrorResponse,
  asyncErrorHandler,
} = require("../middlewares/error/error");
const shortid = require("shortid");

const createBooking = asyncErrorHandler(async (req, res) => {
  let { guestCount, guestDetails, roomDetails } = req.body;
  guestDetails = JSON.parse(guestDetails);
  roomDetails = JSON.parse(roomDetails);
  const file = req.file;
  const fileUrl = file
    ? `${process.env.SERVER_BASEURL}/uploads/${file.filename}`
    : null;
  const updatedGuestDetails = {
    ...guestDetails,
    photo: fileUrl,
  };
  let create = await overnightBooking.create({
    totalGuest: guestCount,
    bookingDetails: roomDetails,
    guestDetails: updatedGuestDetails,
    shortId: shortid.generate(), // Generate a short unique ID
  });

  res.status(200).json(create); // Send the booking with the short ID
});

const getAllBooking = asyncErrorHandler(async (req, res) => {
  let allBooking = await overnightBooking.find({}).sort({ createdAt: -1 });
  res.status(200).json(allBooking);
});

const getBookingByRef = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;

  // Attempt to find the booking by either _id or shortId
  const booking = await overnightBooking.findOne({ shortId: ref });

  if (!booking) {
    throw new ErrorResponse("Booking not found", 404);
  }
  res.status(200).json(booking);
});

const updateBooking = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;
  let { guestCount, guestDetails, roomDetails } = req.body;
  guestDetails = JSON.parse(guestDetails);
  roomDetails = JSON.parse(roomDetails);
  const file = req.file;
  const fileUrl = file
    ? `${process.env.SERVER_BASEURL}/uploads/${file.filename}`
    : null;
  const updatedGuestDetails = {
    ...guestDetails,
    photo: fileUrl,
  };

  let booking = await overnightBooking.findOne(
    { shortId: ref } // Allow fetching by either _id or shortId
  );
  if (!booking) {
    throw new ErrorResponse("Booking not found", 404);
  }

  booking.totalGuest = guestCount;
  booking.bookingDetails = roomDetails;
  booking.guestDetails = updatedGuestDetails;

  await booking.save();
  res.status(200).json(booking);
});
module.exports = {
  createBooking,
  getAllBooking,
  getBookingByRef,
  updateBooking,
};
