import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51LKNirLXlD5FhXLSqnuCxjet0Jq7aELEBpUNIgiKUKZdv2a3wj6EI1YEx0iNfSoKu1xZXHMq0Pje1J9HC51ps3sd00KeVxwvQl"
);

function App() {
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  const HeaderHome = () => (
    <>
      <Header />
      <Home />
    </>
  );

  const HeaderCheckout = () => (
    <>
      <Header />
      <Checkout />
    </>
  );
  const HeaderOrders = () => (
    <>
      <Header />
      <Orders />
    </>
  );

  const HeaderPayment = () => (
    <>
      <Header />
      <Elements stripe={promise}>
        <Payment />
      </Elements>
    </>
  );

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HeaderHome />} />
          <Route path="/orders" element={<HeaderOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<HeaderCheckout />} />
          <Route path="/payment" element={<HeaderPayment />} />
          <Route path="*" element={<HeaderHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
