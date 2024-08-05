const {
  createGuest,
  getGuest,
  getSingle,
  getGuestByEmail,
} = require("../services/guest.service");
const router = require("express").Router();

router.post("/create", createGuest);
router.get("/get/all", getGuest);
router.get("/get/single/:id", getSingle);
router.get("/get/email/:email", getGuestByEmail);

module.exports = router;
