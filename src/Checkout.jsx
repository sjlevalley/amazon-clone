// TODO: add react flip move to the products
import React from 'react'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useSelector } from 'react-redux'
import './Checkout.css'

function Checkout () {
  const user = useSelector(state => state.user.user)
  const basket = useSelector(state => state.basket.basket)

  return (
    <div className='checkout'>
      <div className='checkout__left'>
        <img
          className='checkout__ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
          alt=''
        />
        <h3>{user?.email}</h3>
        <h2 className='checkout__title'>Your shopping Basket</h2>
        {basket.map(item => (
          <CheckoutProduct
            id={item.id}
            key={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            rating={item.rating}
          />
        ))}
      </div>
      <div className='checkout__right'>
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout
