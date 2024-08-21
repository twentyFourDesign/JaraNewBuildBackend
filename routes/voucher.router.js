const {
  createVoucher,
  getAll,
  deleteVoucher,
  validateVoucher,
} = require("../services/voucher.service");

const router = require("express").Router();

router.post("/create", createVoucher);
router.get("/get", getAll);
router.delete("/delete/:id", deleteVoucher);
router.post("/validate", validateVoucher);
// router.delete("/update/:id",updateStaff)

module.exports = router;
