const express = require("express");
const router = express.Router();
const Paystack = require("../config/paystack");

// Initiate a payment
router.post("/initialize", async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await Paystack.transaction.initialize({
      email,
      amount: amount * 100,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Verify a payment
router.get("/verify/:reference", async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await Paystack.transaction.verify(reference);
    console.log("verified");
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
