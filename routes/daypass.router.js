const { create, getAll, getSingle } = require('../services/daypass.service')

const router = require('express').Router()


router.post("/create",create)
router.get("/get/all",getAll)
router.get("/get/single/:id",getSingle)









module.exports = router