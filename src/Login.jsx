import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    console.log("Hello");
    try {
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        "test@email.com",
        "password"
      );
      console.log(signedInUser);
    } catch (e) {
      console.error(e);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log("Hello");
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        "test@email.com",
        "password"
      );
      console.log(createdUser);
    } catch (e) {
      console.error(e);
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
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="login__signInButton"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the Terms & Conditions of this FAKE AMAZON
          CLONE. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
