const express = require("express");
const {
  getPeakOffPriceSetting,
  setPeakOffPriceSetting,
  createPeackOffPriceSetting,
} = require("../services/settings.service");
const router = express.Router();

router.post("/create", createPeackOffPriceSetting);
router.get("/peak-off-price", getPeakOffPriceSetting);
router.post("/peak-off-price", setPeakOffPriceSetting);

module.exports = router;
