const { createGuest, getGuest, getSingle } = require('../services/guest.service')

const router = require('express').Router()


router.post("/create",createGuest)
router.get("/get/all",getGuest)
router.get("/get/single/:id",getSingle)









module.exports = router