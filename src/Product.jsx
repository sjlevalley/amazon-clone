import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "./redux/basketSlice/basketReducer";

import "./Product.css";

function Product({ id, title, image, price, rating }) {
  // eslint-disable-next-line
  const dispatch = useDispatch();

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
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button className="product__addToBasket" onClick={() => addItem()}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
