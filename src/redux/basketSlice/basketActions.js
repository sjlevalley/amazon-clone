import axios from '../../axios'
import { setClientSecret, emptyBasket } from './basketReducer'
import { setLoading, setSubmitting } from '../uiSlice/uiReducer'
import { getBasketTotal } from '../../util'
import { db } from '../../firebase-setup'
import { doc, setDoc } from 'firebase/firestore'
import { setNotification } from '../uiSlice/uiReducer'

export const getClientSecretAction = basket => {
  return async dispatch => {
    dispatch(setLoading('clientSecret'))
    try {
      const { data } = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      dispatch(setClientSecret(data.clientSecret))
    } catch (e) {
      console.error(e)
      let level = 'error'
      let message = 'Oops! - An error occurred!'
      if (basket.length === 0) {
        level = 'warning'
        message = 'Warning - Please select at least 1 item to proceed'
      }
      dispatch(
        setNotification({
          level,
          message
        })
      )
    }
    dispatch(setLoading(false))
  }
}

export const submitPaymentAction = (
  basket,
  elements,
  CardElement,
  clientSecret,
  stripe,
  user,
  navigate
) => {
  return async dispatch => {
    if (basket.length === 0) {
      dispatch(
        setNotification({
          level: 'error',
          message:
            'Oops! - You must have items in your basket to perform this action!'
        })
      )
      return
    }
    dispatch(setSubmitting(true))
    try {
      // paymentIntent = payment confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      })
      const userRef = doc(db, 'users', user?.uid, 'orders', paymentIntent?.id)
      await setDoc(userRef, {
        basket: basket,
        amount: paymentIntent.amount,
        amountDollars: `$${paymentIntent.amount / 100}`,
        created: paymentIntent.created
      })
      navigate('/')
      dispatch(
        setNotification({
          level: 'success',
          message: 'Payment Successful!'
        })
      )
      dispatch(emptyBasket())
    } catch (e) {
      console.error(e)
      dispatch(
        setNotification({
          level: 'error',
          message: 'Oops! - An error occurred while processing this request!'
        })
      )
    }
    dispatch(setSubmitting(false))
  }
}
