const {
  asyncErrorHandler,
  ErrorResponse,
} = require("../middlewares/error/error");
const { paymentModel } = require("../models");
const { statusCode } = require("../utils/statusCode");
const { sendEmail } = require("../config/mail.config");
const { SubRooms } = require("../models/rooms.schema");
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

const formatPrice = (price) => {
  const priceNumber = Number(price);
  return priceNumber.toLocaleString(); // Format the price with commas
};
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
      bookingType:
        roomDetails?.selectedRooms?.map((room) => ` ${room.title}`) ||
        "Day Pass",
      checkIn: roomDetails?.visitDate
        ? formatDate(roomDetails?.visitDate)
        : roomDetails?.startDate,
      checkOut: roomDetails?.endDate
        ? formatDate(roomDetails?.endDate)
        : roomDetails?.startDate,
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
      subTotal: formatPrice(req.body.subTotal),
      multiNightDiscount: req.body.discount.toLocaleString(),
      clubMemberDiscount: req.body.voucher,
      multiNightDiscountAvailable: req.body.multiNightDiscount
        ? req.body.multiNightDiscount
        : 0,
      vat: formatPrice(req.body.vat),
      totalCost: formatPrice(req.body.totalCost),
    };
    if (req.body.status === "Pending") {
      sendEmail(
        guestDetails.email,
        "Your Booking Is Pending",
        "pending_payment",
        emailContext
      );
      sendEmail(
        "bookings@jarabeachresort.com",
        "New Booking Pending",
        "pending_payment",
        emailContext
      );
    } else if (req.body.status === "Success") {
      sendEmail(
        guestDetails.email,
        "Your Booking Is Confirmed",
        "confirmation",
        emailContext
      );
      sendEmail(
        "bookings@jarabeachresort.com",
        "New Booking Confirmed",
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
    throw new ErrorResponse("No Payment Found", 404);
  }
});
const getByBookingId = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  let daypass = await paymentModel.find({ ref: id });
  if (daypass) {
    res.status(statusCode.accepted).json(daypass);
  } else {
    throw new ErrorResponse("No Payment Found", 404);
  }
});

const confirm = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;
  const { bank } = req.body;
  let payment = await paymentModel.findOne({ ref });
  if (payment) {
    payment.status = "Success"; // Update the status to confirm
    payment.method = `Bank Transfer ${bank}`;
    await payment.save();
    res.status(statusCode.accepted).json(payment);
    const guestDetails = JSON.parse(payment.guestDetails);
    const roomDetails = JSON.parse(payment.roomDetails);

    const emailContext = {
      name: payment.name,
      email: guestDetails.email,
      id: payment.ref,
      bookingType:
        roomDetails?.selectedRooms?.map((room) => ` ${room.title}`) ||
        "Day Pass",
      checkIn: roomDetails?.visitDate
        ? formatDate(roomDetails?.visitDate)
        : roomDetails?.startDate,
      checkOut: roomDetails?.endDate
        ? formatDate(roomDetails?.endDate)
        : roomDetails?.startDate,
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
      subTotal: formatPrice(payment.subTotal),
      multiNightDiscount: payment.discount.toLocaleString(),
      clubMemberDiscount: payment.voucher,
      multiNightDiscountAvailable: payment.multiNightDiscount
        ? payment.multiNightDiscount
        : 0,
      vat: formatPrice(payment.vat),
      totalCost: formatPrice(payment.totalCost),
    };
    sendEmail(
      guestDetails.email,
      "Your Booking Is Confirmed",
      "confirmation",
      emailContext
    );
    sendEmail(
      "bookings@jarabeachresort.com",
      "New Booking Confirmed",
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
      bookingType:
        roomDetails?.selectedRooms?.map((room) => ` ${room.title}`) ||
        "Day Pass",
      checkIn: roomDetails?.visitDate
        ? formatDate(roomDetails?.visitDate)
        : roomDetails?.startDate,
      checkOut: roomDetails?.endDate
        ? formatDate(roomDetails?.endDate)
        : roomDetails?.startDate,
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
      subTotal: formatPrice(payment.subTotal),
      multiNightDiscount: payment.discount.toLocaleString(),
      clubMemberDiscount: payment.voucher,
      multiNightDiscountAvailable: payment.multiNightDiscount
        ? payment.multiNightDiscount
        : 0,
      vat: formatPrice(payment.vat),
      totalCost: formatPrice(payment.totalCost),
    };
    sendEmail(
      guestDetails.email,
      "Your Booking Has Been Cancelled",
      "cancellation",
      emailContext
    );
    sendEmail(
      "bookings@jarabeachresort.com",
      "Booking Cancelled",
      "cancellation",
      emailContext
    );
  } else {
    throw new ErrorResponse("Booking Not Found", 404);
  }
});
const updatePayment = asyncErrorHandler(async (req, res) => {
  const { ref } = req.params;
  const payment = await paymentModel.findOne({ ref });
  if (!payment) {
    throw new ErrorResponse("Payment not found", 404);
  }

  Object.assign(payment, req.body);

  await payment.save();
  res.status(200).json(payment);

  const roomDetails = JSON.parse(payment.roomDetails);
  const guestDetails = JSON.parse(payment.guestDetails);
  const emailContext = {
    name: payment.name,
    email: guestDetails.email,
    id: payment.ref,
    bookingType:
      roomDetails?.selectedRooms?.map((room) => ` ${room.title}`) || "Day Pass",
    checkIn: roomDetails?.visitDate
      ? formatDate(roomDetails?.visitDate)
      : roomDetails?.startDate,
    checkOut: roomDetails?.endDate
      ? formatDate(roomDetails?.endDate)
      : roomDetails?.startDate,
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
          (new Date(roomDetails?.endDate) - new Date(roomDetails?.visitDate)) /
            (1000 * 60 * 60 * 24) +
            1
        )
      : "Day Pass",
    subTotal: formatPrice(payment.subTotal),
    multiNightDiscount: payment.discount.toLocaleString(),
    clubMemberDiscount: payment.voucher,
    multiNightDiscountAvailable: payment.multiNightDiscount
      ? payment.multiNightDiscount
      : 0,
    vat: formatPrice(payment.vat),
    totalCost: formatPrice(payment.totalCost),
    previousCost: payment.previousCost.toLocaleString(),
    differenceToPay:
      payment.previousPaymentStatus == "Pending"
        ? formatPrice(payment.totalCost)
        : parseFloat(payment.totalCost) - parseFloat(payment.previousCost) > 0
        ? (
            parseFloat(payment.totalCost) - parseFloat(payment.previousCost)
          ).toLocaleString()
        : 0,
  };
  if (req.body.status === "Pending") {
    sendEmail(
      guestDetails.email,
      "Your Booking Is Updated",
      "manage_pending",
      emailContext
    );
    sendEmail(
      "bookings@jarabeachresort.com",
      "Booking Updated",
      "manage_pending",
      emailContext
    );
  } else if (req.body.status === "Success") {
    sendEmail(
      guestDetails.email,
      "Your Booking Is Updated",
      "manage_success",
      emailContext
    );
    sendEmail(
      "bookings@jarabeachresort.com",
      "Booking Updated",
      "manage_success",
      emailContext
    );
  }
});
module.exports = {
  create,
  getAll,
  getByBookingId,
  getSingle,
  confirm,
  cancel,
  updatePayment,
};
