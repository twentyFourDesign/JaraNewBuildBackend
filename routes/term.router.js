const {create,getAll} = require('../services/term.service')

const router = require('express').Router()


router.post("/create",create)
router.get("/get",getAll)

module.exports = router