import React from "react";
import Navbar from "../components/Navbar";
import PaymentForm from "../components/PaymentForm";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <PaymentForm />
      </div>
    </>
  );
};

export default Home;
