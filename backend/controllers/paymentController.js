const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_default_key_for_testing");
const Transaction = require("../models/transactionModel");
const { v4: uuidv4 } = require("uuid");

// Process Payment
const processPayment = async (req, res) => {
  const { amount, currency, token } = req.body;

  // Check if we are in test mode
  const isTestMode = process.env.IS_TEST_MODE === "true";

  try {
    let charge;

    if (isTestMode) {
      // Mock Stripe charge response for testing
      charge = {
        id: `ch_mock_${uuidv4()}`,
        amount: amount * 100,
        currency,
        description: "Payment Gateway System (Mocked)",
        status: "succeeded",
      };
    } else {
      // Real Stripe API call
      const idempotencyKey = uuidv4();

      charge = await stripe.charges.create(
        {
          amount: amount * 100, // Amount in cents
          currency,
          source: token.id, // Token from the frontend
          description: "Payment Gateway System",
        },
        { idempotencyKey }
      );
    }

    // Save transaction in the database
    const newTransaction = await Transaction.create({
      transactionId: charge.id,
      amount,
      currency,
      status: "Success",
    });

    res.status(200).json({ message: "Payment Successful", transaction: newTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment Failed", error });
  }
};

module.exports = { processPayment };
