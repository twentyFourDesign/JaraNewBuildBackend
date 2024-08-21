const {
  createDiscount,
  getAll,
  deleteDiscount,
  validateVoucher,
} = require("../services/voucerDaypass.service");

const router = require("express").Router();

router.post("/create", createDiscount);
router.get("/get", getAll);
router.delete("/delete/:id", deleteDiscount);
router.post("/validate", validateVoucher);
// router.delete("/update/:id",updateStaff)

module.exports = router;
