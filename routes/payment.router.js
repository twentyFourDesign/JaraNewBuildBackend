const {
  create,
  getAll,
  getSingle,
  confirm,
  cancel,
  getByBookingId,
  updatePayment,
} = require("../services/payment.service");

const router = require("express").Router();

router.post("/create", create);
router.get("/get", getAll);
router.get("/get/single/:id", getSingle);
router.get("/get/byBookingId/:id", getByBookingId);
router.post("/confirm/:ref", confirm);
router.post("/cancel/:ref", cancel);
router.put("/update/:ref", updatePayment);

module.exports = router;
