const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");
const { paymentModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const { sendEmail } = require("../config/mail.config");
const { SubRooms } = require("../models/rooms.schema");

const create = asyncErrorHandler(async (req, res) => {
  const guestDetails = JSON.parse(req.body.guestDetails);
  const roomDetails = JSON.parse(req.body.roomDetails);

  let createDaypass = await paymentModel.create(req.body);
  if (createDaypass) {
    res.status(statusCode.accepted).json(createDaypass);
    const emailContext = {
      name: req.body.name,
      email: guestDetails.email,
      id: req.body.ref,
      bookingType: roomDetails?.selectedRooms?.[0]?.title || "Day Pass",
      checkIn: roomDetails?.visitDate || roomDetails?.startDate,
      checkOut: roomDetails?.endDate || roomDetails?.startDate,
      numberOfGuests: `${
        roomDetails?.selectedRooms?.[0]?.guestCount?.adults ??
        roomDetails?.adultsCount ??
        0
      } Adults, ${
        roomDetails?.selectedRooms?.[0]?.guestCount?.children ??
        roomDetails?.childrenCount ??
        0
      } Children`,
      numberOfNights: roomDetails?.visitDate
        ? Math.round(
            (new Date(roomDetails?.endDate) -
              new Date(roomDetails?.visitDate)) /
              (1000 * 60 * 60 * 24) +
              1
          )
        : "Day Pass",
      subTotal: req.body.subTotal,
      multiNightDiscount: "₦0",
      clubMemberDiscount: "₦0",
      vat: req.body.vat,
      totalCost: req.body.totalCost,
    };
    if (req.body.status === "Pending") {
      sendEmail(
        guestDetails.email,
        "Booking Pending",
        "pending_payment",
        emailContext
      );
    } else if (req.body.status === "Success") {
      sendEmail(
        guestDetails.email,
        "Booking Confirmed",
        "confirmation",
        emailContext
      );
    }
  } else {
    throw new ErrorResponse("Failed To Create Payment", 404);
  }
});

const getAll = asyncErrorHandler(async (req, res) => {
  let allDaypass = await paymentModel.find({}).sort({ createdAt: -1 });
  if (allDaypass.length > 0) {
    res.status(statusCode.accepted).json(allDaypass);
  } else {
    throw new ErrorResponse("No Payment Found", 404);
  }
});

const getSingle = asyncErrorHandler(async (req, res) => {
  let daypass = await paymentModel.findById(req.params.id);
  if (daypass) {
    res.status(statusCode.accepted).json(daypass);
  } else {
    throw new ErrorResponse("No Daypass Booking Found", 404);
  }
});

const confirm = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;
  const { bank } = req.body;
  let payment = await paymentModel.findOne({ ref });
  if (payment) {
    payment.status = "Success"; // Update the status to confirmed
    payment.method = `Bank Transfer ${bank}`;
    await payment.save();
    res.status(statusCode.accepted).json(payment);
    const guestDetails = JSON.parse(payment.guestDetails);
    const roomDetails = JSON.parse(payment.roomDetails);

    const emailContext = {
      name: payment.name,
      email: guestDetails.email,
      id: payment.ref,
      bookingType: roomDetails?.selectedRooms?.[0]?.title || "Day Pass",
      checkIn: roomDetails?.visitDate || roomDetails?.startDate,
      checkOut: roomDetails?.endDate || roomDetails?.startDate,
      numberOfGuests: `${
        roomDetails?.selectedRooms?.[0]?.guestCount?.adults ??
        roomDetails?.adultsCount ??
        0
      } Adults, ${
        roomDetails?.selectedRooms?.[0]?.guestCount?.children ??
        roomDetails?.childrenCount ??
        0
      } Children`,
      numberOfNights: roomDetails?.visitDate
        ? Math.round(
            (new Date(roomDetails?.endDate) -
              new Date(roomDetails?.visitDate)) /
              (1000 * 60 * 60 * 24) +
              1
          )
        : "Day Pass",
      subTotal: payment.subTotal,
      multiNightDiscount: "₦0",
      clubMemberDiscount: "₦0",
      vat: payment.vat,
      totalCost: payment.totalCost,
    };
    sendEmail(
      guestDetails.email,
      "Booking Confirmed",
      "confirmation",
      emailContext
    );
  } else {
    throw new ErrorResponse("Payment Not Found", 404);
  }
});

const cancel = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;
  const payment = await paymentModel.findOne({ ref });
  if (payment) {
    const roomDetails = JSON.parse(payment.roomDetails);
    if (roomDetails.selectedRooms) {
      for (const room of roomDetails.selectedRooms) {
        await SubRooms.findByIdAndUpdate(room.id, {
          $inc: { availableRoom: room.quantity },
        });
      }
    }
    payment.status = "Cancelled";
    await payment.save();
    res.status(statusCode.accepted).json(payment);
    const guestDetails = JSON.parse(payment.guestDetails);
    const emailContext = {
      name: payment.name,
      email: guestDetails.email,
      id: payment.ref,
      bookingType: roomDetails?.selectedRooms?.[0]?.title || "Day Pass",
      checkIn: roomDetails?.visitDate || roomDetails?.startDate,
      checkOut: roomDetails?.endDate || roomDetails?.startDate,
      numberOfGuests: `${
        roomDetails?.selectedRooms?.[0]?.guestCount?.adults ??
        roomDetails?.adultsCount ??
        0
      } Adults, ${
        roomDetails?.selectedRooms?.[0]?.guestCount?.children ??
        roomDetails?.childrenCount ??
        0
      } Children`,
      numberOfNights: roomDetails?.visitDate
        ? Math.round(
            (new Date(roomDetails?.endDate) -
              new Date(roomDetails?.visitDate)) /
              (1000 * 60 * 60 * 24) +
              1
          )
        : "Day Pass",
      subTotal: payment.subTotal,
      multiNightDiscount: "₦0",
      clubMemberDiscount: "₦0",
      vat: payment.vat,
      totalCost: payment.totalCost,
    };
    sendEmail(
      guestDetails.email,
      "Booking Cancelled",
      "cancellation",
      emailContext
    );
  } else {
    throw new ErrorResponse("Booking Not Found", 404);
  }
});
module.exports = { create, getAll, getSingle, confirm, cancel };
