import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  signInAction,
  registerUserAction,
} from "./redux/userSlice/userActions";
import { setError } from "./redux/uiSlice/uiReducer";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitting = useSelector((state) => state.ui.submitting);
  const error = useSelector((state) => state.ui.error?.code);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(signInAction(email, password, navigate));
  };

  const register = async (e) => {
    e.preventDefault();
    dispatch(registerUserAction(email, password, navigate));
  };

  const handleChange = (e, field) => {
    dispatch(setError(null));
    if (field === "email") {
      setEmail(e.target.value);
    }
    if (field === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => handleChange(e, "email")}
          />
          {error === "auth/user-not-found" && (
            <Box
              sx={{
                color: "red",
                fontSize: "12px",
                margin: "-8px 0 5px 0",
              }}
            >
              <p>Credentials Invalid</p>
            </Box>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => handleChange(e, "password")}
          />
          <h5>Password</h5>
          <button
            type="submit"
            className="login__signInButton"
            onClick={signIn}
          >
            {submitting === "login" ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={20} color="inherit" />
              </Box>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p>
          By signing-in you agree to the Terms & Conditions of this FAKE AMAZON
          CLONE. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={register}>
          {submitting === "register" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={20} color="inherit" />
            </Box>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
