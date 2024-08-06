const {
  create,
  getAll,
  getSingle,
  confirm,
  cancel,
} = require("../services/payment.service");

const router = require("express").Router();

router.post("/create", create);
router.get("/get", getAll);
router.get("/get/single/:id", getSingle);
router.post("/confirm/:ref", confirm);
router.post("/cancel/:ref", cancel);
module.exports = router;
