const express = require("express");
const router = express.Router();
const SeasonalService = require("../services/seasonal.service");

router.get("/get", SeasonalService.getAllSeasonal);
router.post("/create", SeasonalService.createSeasonal);
router.post("/update/:id", SeasonalService.createSeasonal);
router.delete("/delete/:id", SeasonalService.deleteSeasonal);

module.exports = router;
