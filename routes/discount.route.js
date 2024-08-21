const {
  createDiscount,
  getAll,
  deleteDiscount,
  validateDiscount,
} = require("../services/discount.service");

const router = require("express").Router();

router.post("/create", createDiscount);
router.get("/get", getAll);
router.delete("/delete/:id", deleteDiscount);
router.post("/validate", validateDiscount);
// router.delete("/update/:id",updateStaff)

module.exports = router;
