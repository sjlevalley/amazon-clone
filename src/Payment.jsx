import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CheckoutProduct from './CheckoutProduct'
import CircularProgress from '@mui/material/CircularProgress'
import CurrencyFormat from 'react-currency-format'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
// Local imports
import { getBasketTotal } from './util'
import {
  getClientSecretAction,
  submitPaymentAction
} from './redux/basketSlice/basketActions'
import './Payment.css'

function Payment () {
  const dispatch = useDispatch()
  const elements = useElements()
  const navigate = useNavigate()
  const stripe = useStripe()

  const basket = useSelector(state => state.basket.basket)
  const clientSecret = useSelector(state => state.basket.clientSecret)
  const submitting = useSelector(state => state.ui.submitting)
  const user = useSelector(state => state.user.user)

  const [error, setError] = useState(null)

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    dispatch(getClientSecretAction(basket))
    // eslint-disable-next-line
  }, [basket])

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch(
      submitPaymentAction(
        basket,
        elements,
        CardElement,
        clientSecret,
        stripe,
        user,
        navigate
      )
    )
  }

  const handleChange = e => {
    setError(e.error ? e.error.message : '')
  }

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h2>
          Checkout &nbsp; (<Link to='/checkout'> {basket?.length} items</Link>)
        </h2>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review Items and Delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.length === 0 ? (
              <div className='payment__emptyBasket'>
                <span>Your shopping cart is empty</span>
                <Link to='/'>Click here to continue shopping</Link>
              </div>
            ) : (
              basket.map(item => (
                <CheckoutProduct
                  id={item.id}
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                />
              ))
            )}
          </div>
        </div>
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={value => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                {basket?.length >= 1 && (
                  <button disabled={submitting}>
                    <span>
                      {submitting ? (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <p style={{ marginRight: '10px' }}>Processing</p>
                          <CircularProgress size={20} color='inherit' />
                        </Box>
                      ) : (
                        'Buy Now'
                      )}
                    </span>
                  </button>
                )}
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
