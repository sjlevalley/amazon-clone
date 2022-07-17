import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "./redux/basketSlice/basketReducer";

import "./Product.css";

function Product({ id, title, image, price, rating }) {
  // eslint-disable-next-line
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const addItem = () => {
    const newItem = {
      id,
      title,
      image,
      price,
      rating,
    };

    dispatch(addToBasket(newItem));
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={Math.random()}>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button
        disabled={!user}
        className="product__addToBasket"
        onClick={() => addItem()}
      >
        {!user ? "Login to Add Product" : "Add to Basket"}
      </button>
    </div>
  );
}

export default Product;
