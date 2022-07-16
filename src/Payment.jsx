import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "./axios";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { doc, setDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// Local imports
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { db } from "./firebase-setup";
import { emptyBasket } from "./redux/basketSlice/basketReducer";

function Payment() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.basket);
  const user = useSelector((state) => state.user.user);
  const elements = useElements();
  const navigate = useNavigate();
  const stripe = useStripe();

  const getBasketTotal = () =>
    basket?.reduce((amount, item) => item.price + amount, 0);

  const [clientSecret, setClientSecret] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    try {
      getClientSecret();
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    try {
      // paymentIntent = payment confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      const userRef = doc(db, "users", user?.uid, "orders", paymentIntent?.id);
      await setDoc(userRef, {
        basket: basket,
        amount: paymentIntent.amount,
        amountDollars: `$${paymentIntent.amount / 100}`,
        created: paymentIntent.created,
      });
    } catch (e) {
      console.error(e);
    }
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    dispatch(emptyBasket);
    navigate("/orders", { replace: true });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={
                    processing || disabled || succeeded || basket.length === 0
                  }
                >
                  <span>
                    {processing ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p>Processing</p>
                        <CircularProgress size={20} color="inherit" />
                      </Box>
                    ) : (
                      "Buy Now"
                    )}
                  </span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
