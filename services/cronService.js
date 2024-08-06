const cron = require("node-cron");
const { paymentModel } = require("../models");
const { sendEmail } = require("../config/mail.config");
const { SubRooms } = require("../models/rooms.schema");

cron.schedule("0 * * * *", async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const pendingPayments = await paymentModel.find({
    status: "Pending",
    createdAt: { $lte: oneHourAgo },
  });

  for (const payment of pendingPayments) {
    const guestDetails = JSON.parse(payment.guestDetails);
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
    const emailContext = {
      name: payment.name,
      email: guestDetails.email,
      id: payment.ref,
      bookingType: roomDetails?.selectedRooms?.[0]?.title || "Day Pass",
      checkIn: roomDetails?.visitDate || roomDetails?.startDate,
      checkOut: roomDetails?.endDate || roomDetails?.startDate,
      numberOfGuests: `${
        roomDetails?.selectedRooms?.[0]?.guestCount?.adults ||
        roomDetails?.adultsCount
      } Adults, ${
        roomDetails?.selectedRooms?.[0]?.guestCount?.children ||
        roomDetails?.childrenCount
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
  }
});
