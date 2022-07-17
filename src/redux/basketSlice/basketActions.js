import axios from '../../axios'
import { setClientSecret, emptyBasket } from './basketReducer'
import { setLoading, setSubmitting, setError } from '../uiSlice/uiReducer'
import { getBasketTotal } from '../../util'
import { db } from '../../firebase-setup'
import { doc, setDoc } from 'firebase/firestore'

export const getClientSecretAction = basket => {
  console.log('GETTING CLIENT SECRET!')
  return async dispatch => {
    dispatch(setLoading('clientSecret'))
    try {
      const { data } = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      console.log(data.clientSecret)
      dispatch(setClientSecret(data.clientSecret))
    } catch (e) {
      console.error(e)
      dispatch(setError(e))
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
  console.log('GETTING CLIENT SECRET!')
  return async dispatch => {
    if (basket.length === 0) {
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
    } catch (e) {
      console.error(e)
    }
    dispatch(setSubmitting(false))
    dispatch(emptyBasket())
    navigate('/')
  }
}
