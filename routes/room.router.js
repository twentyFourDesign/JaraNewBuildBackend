const {create,getAll, del} = require('../services/room.service')

const router = require('express').Router()


router.post("/create",create)
router.get("/get/:type",getAll)
router.delete("/delete/:id",del)

module.exports = router