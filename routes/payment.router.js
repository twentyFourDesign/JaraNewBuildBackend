const { create, getAll, getSingle } = require("../services/payment.service");

const router = require("express").Router();

router.post("/create", create);
router.get("/get", getAll);
router.get("/get/single/:id", getSingle);

module.exports = router;
