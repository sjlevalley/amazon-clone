import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Local imports
import "./App.css";
import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Orders from "./Orders";
import Payment from "./Payment";
import { auth } from "./firebase-setup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { setUser } from "./redux/userSlice/userReducer";

const promise = loadStripe(
  "pk_test_51LKNirLXlD5FhXLSqnuCxjet0Jq7aELEBpUNIgiKUKZdv2a3wj6EI1YEx0iNfSoKu1xZXHMq0Pje1J9HC51ps3sd00KeVxwvQl"
);

function App() {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
