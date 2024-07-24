const {create,getAll} = require('../services/personal.service')

const router = require('express').Router()


router.post("/create",create)
router.get("/get",getAll)

module.exports = router