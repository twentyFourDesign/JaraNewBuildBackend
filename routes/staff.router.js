const {createStaff,updateStaff,getAll,getSingle,deleteStaff } = require('../services/staff.service')

const router = require('express').Router()


router.post("/create",createStaff)
router.get("/get",getAll)
router.delete("/delete/:id",deleteStaff)
// router.update("/update/:id",updateStaff)














module.exports = router