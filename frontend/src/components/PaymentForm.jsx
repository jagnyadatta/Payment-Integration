import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import api from "../services/api"; // Axios API

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to handle the payment submission
  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const token = { id: "sample-token-id" }; // You will use Stripe here to get the real token from the frontend

      const response = await api.post("/api/payments", {
        amount,
        currency,
        token,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error("Payment Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Make a Payment</Typography>
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Currency"
        variant="outlined"
        fullWidth
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        sx={{ mt: 2 }}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </Box>
  );
};

export default PaymentForm;
