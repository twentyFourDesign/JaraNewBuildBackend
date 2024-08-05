const {
  createBooking,
  getAllBooking,
  getBookingByRef,
} = require("../services/overnight.booking.service");

const router = require("express").Router();

const upload = require("../middlewares/fileupload/upload.middleware");
router.post(`/create`, upload.single("file"), createBooking);
router.get(`/get/all`, getAllBooking);
router.get(`/get/:ref`, getBookingByRef);

module.exports = router;
