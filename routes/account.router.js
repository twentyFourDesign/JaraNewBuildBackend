const { verifyToken } = require('../middlewares/authentication/jwt')
const { regitserAccountValidation, loginAccountValidation } = require('../middlewares/validation/account.validation')
const { registerAccount, loginAccount, getSingelAccount, getUserByRole, deleteAccount } = require('../services/account.service')

const router = require('express').Router()


router.post("/register",regitserAccountValidation,registerAccount) // REGISTER
router.post("/login",loginAccountValidation,loginAccount) // LOGIN
router.get("/:id",verifyToken,getSingelAccount) // GET BY ID
router.get("/role/:role",verifyToken,getUserByRole) // GET ALL BY ROLE
router.delete("/delete/:id",verifyToken,deleteAccount) // DELETE














module.exports = router