const cron = require("node-cron");
const { paymentModel } = require("../models");
const { sendEmail } = require("../config/mail.config");
const { SubRooms } = require("../models/rooms.schema");
const { voucherModel } = require("../models");
const { dayPassVouherModel } = require("../models");
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
cron.schedule("* * * * *", async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const pendingPayments = await paymentModel.find({
      status: "Pending",
      updatedAt: { $lte: oneHourAgo },
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
          "Your Booking has been Cancelled",
          "cancellation",
          emailContext
        );
        sendEmail(
          "bookings@jarabeachresort.com",
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
      {
        $or: [
          { expireAt: { $lt: now }, status: "active" },
          { expireAt: { $lt: now }, status: "Active" },
        ],
      },
      { $set: { status: "expired" } }
    );
    await dayPassVouherModel.updateMany(
      {
        $or: [
          { expireAt: { $lt: now }, status: "active" },
          { expireAt: { $lt: now }, status: "Active" },
        ],
      },
      { $set: { status: "expired" } }
    );
    console.log("Expired vouchers updated successfully");
  } catch (error) {
    console.error("Error updating expired vouchers:", error);
  }
};

// Schedule the task to run daily at midnight
cron.schedule("0 0 * * *", updateExpiredVouchers);
