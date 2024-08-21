const cron = require("node-cron");
const { paymentModel } = require("../models");
const { sendEmail } = require("../config/mail.config");
const { SubRooms } = require("../models/rooms.schema");
const { voucherModel } = require("../models");
cron.schedule("0 * * * *", async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const pendingPayments = await paymentModel.find({
      status: "Pending",
      createdAt: { $lte: oneHourAgo },
    });

    for (const payment of pendingPayments) {
      try {
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
      } catch (err) {
        console.log("failed to cancel");
      }
    }
  } catch (err) {
    console.log("failed to cancel");
  }
});

// Function to update expired vouchers
const updateExpiredVouchers = async () => {
  try {
    const now = new Date();
    await voucherModel.updateMany(
      { expireAt: { $lt: now }, status: "active" },
      { $set: { status: "expired" } }
    );
    console.log("Expired vouchers updated successfully");
  } catch (error) {
    console.error("Error updating expired vouchers:", error);
  }
};

// Schedule the task to run daily at midnight
cron.schedule("0 0 * * *", updateExpiredVouchers);
