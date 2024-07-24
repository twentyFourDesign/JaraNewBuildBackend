const {create,getAll, del} = require('../services/lookout.service')

const router = require('express').Router()


router.post("/create",create)
router.get("/get",getAll)
router.delete("/delete/:id",del)

module.exports = router