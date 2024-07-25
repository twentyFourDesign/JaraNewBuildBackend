const { createBooking, getAllBooking } = require('../services/overnight.booking.service')

const router = require ('express').Router()


router.post(`/create`,createBooking)
router.get(`/get/all`,getAllBooking)



module.exports = router