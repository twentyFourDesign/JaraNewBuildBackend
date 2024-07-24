const {create,getAll} = require('../services/loadging.service')

const router = require('express').Router()


router.post("/create",create)
router.get("/get",getAll)

module.exports = router