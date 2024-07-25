const {createVoucher,getAll,deleteVoucher} = require('../services/voucher.service')

const router = require('express').Router()


router.post("/create",createVoucher)
router.get("/get",getAll)
router.delete("/delete/:id",deleteVoucher)
// router.delete("/update/:id",updateStaff)

module.exports = router