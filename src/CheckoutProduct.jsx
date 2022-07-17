import React from 'react'
import { useDispatch } from 'react-redux'
import './CheckoutProduct.css'
import { removeFromBasket } from './redux/basketSlice/basketReducer'

function CheckoutProduct ({ id, image, title, price, rating, hideButton }) {
  // eslint-disable-next-line
  const dispatch = useDispatch()

  return (
    <div className='checkoutProduct'>
      <img className='checkoutProduct__image' src={image} alt='Product' />

      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={Math.random()}>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={() => dispatch(removeFromBasket(id))}>
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
