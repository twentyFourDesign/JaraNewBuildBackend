const allRoutes = require("express").Router();
const accountRoute = require("./account.router");
const guestRoute = require("./guest.router");
const daypassRoute = require("./daypass.router");
const staffRoute = require("./staff.router");
const voucherRoute = require("./voucher.router");
const discountRoute = require("./discount.route");
const DaypassdiscountRoute = require("./daypassDiscount.route");
const DaypassVoucherRoute = require("./daypassVoucher.route");
const paymentRoute = require("./payment.router");
const overnightBookingRoute = require("./overnight.booking.router");
const daypassBookingRoute = require("./daypass.booking.router");
const paymentRoutes = require("./paymentRoutes");
// SETTINGS
const termRoute = require("./term.router");
const roomRoute = require("./room.router");
const lookoutRoute = require("./lookout.router");
const massageRoute = require("./massage.router");
const loadgingRoute = require("./loadging.router");
const cakeRoute = require("./cake.router");
const optionRoute = require("./option.router");
const personalRoute = require("./personal.router");
const drinkRoute = require("./drink.router");
const ridingRoute = require("../services/riding.router");
const holidayRoute = require("./holiday.router");
const blockedDaypass = require("./blockedDaypass.router");
const disableRoute = require("./disable.router");

const mainRoomRoute = require("./mainRoom.router");

allRoutes.use("/admin", accountRoute);
allRoutes.use("/guest", guestRoute);
allRoutes.use("/daypass", daypassRoute);
allRoutes.use("/staff", staffRoute);
allRoutes.use("/voucher", voucherRoute);
allRoutes.use("/discount", discountRoute);
allRoutes.use("/daypass/discount", DaypassdiscountRoute);
allRoutes.use("/daypass/voucher", DaypassVoucherRoute);
allRoutes.use("/payment", paymentRoute);
allRoutes.use("/payment/paystack", paymentRoutes);
allRoutes.use("/overnight/booking", overnightBookingRoute);
allRoutes.use("/daypass/booking", daypassBookingRoute);

// SETTINGS
allRoutes.use("/terms/condition", termRoute);
allRoutes.use("/rooms", roomRoute);
allRoutes.use("/lookout", lookoutRoute);
allRoutes.use("/massage", massageRoute);
allRoutes.use("/loadging", loadgingRoute);
allRoutes.use("/cake", cakeRoute);
allRoutes.use("/option", optionRoute);
allRoutes.use("/personal", personalRoute);
allRoutes.use("/riding", ridingRoute);
allRoutes.use("/drink", drinkRoute);
allRoutes.use("/holiday", holidayRoute);
allRoutes.use("/block/booking", blockedDaypass);
allRoutes.use("/disable", disableRoute);

allRoutes.use("/main/rooms", mainRoomRoute);

module.exports = { allRoutes };
