const {
  createMassage,
  getAll,
  del,
  update,
} = require("../services/massage.service");

const router = require("express").Router();

router.post("/create", createMassage);
router.put("/update/:id", update);
router.get("/get", getAll);
router.delete("/delete/:id", del);

module.exports = router;
