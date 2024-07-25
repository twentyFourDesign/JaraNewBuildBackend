const {createDiscount,getAll,deleteDiscount} = require('../services/discount.service')

const router = require('express').Router()


router.post("/create",createDiscount)
router.get("/get",getAll)
router.delete("/delete/:id",deleteDiscount)
// router.delete("/update/:id",updateStaff)

module.exports = router