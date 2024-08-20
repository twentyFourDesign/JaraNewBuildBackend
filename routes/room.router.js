const { create, getAll, getByType, del } = require("../services/room.service");

const router = require("express").Router();

router.post("/create", create);
router.get("/get", getAll);
router.get("/get/:type", getByType);
router.delete("/delete/:id", del);

module.exports = router;
