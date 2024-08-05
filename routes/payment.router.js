const {
  create,
  getAll,
  getSingle,
  confirm,
} = require("../services/payment.service");

const router = require("express").Router();

router.post("/create", create);
router.get("/get", getAll);
router.get("/get/single/:id", getSingle);
router.post("/confirm/:ref", confirm);

module.exports = router;
