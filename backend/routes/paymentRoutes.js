const express = require("express");
const router = express.Router();
const { processPayment } = require("../controllers/paymentController");

// Route to process payment
router.post("/", processPayment);

module.exports = router;
