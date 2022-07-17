import { query, orderBy, collection, getDocs } from 'firebase/firestore'
import { setUser, setOrders } from './userReducer'
import { setSubmitting, setError } from '../uiSlice/uiReducer'
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '../../firebase-setup'
import { db } from '../../firebase-setup'

export const signInAction = (email, password, navigate) => {
  return async dispatch => {
    dispatch(setSubmitting('login'))
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      dispatch(setUser(user))
      navigate('/')
    } catch (e) {
      console.error(e)
      dispatch(setError(e))
    }
    dispatch(setSubmitting(false))
  }
}

export const registerUserAction = (email, password, navigate) => {
  return async dispatch => {
    try {
      dispatch(setSubmitting('register'))
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      dispatch(setUser(user))
      navigate('/')
    } catch (e) {
      console.error(e)
      dispatch(setError(e.response.data))
    }
    dispatch(setSubmitting(false))
  }
}

export const getUserOrdersAction = user => {
  return async dispatch => {
    if (user) {
      const fetchOrders = async () => {
        const userRef = collection(db, `users/${user?.uid}/orders`)
        const q = query(userRef, orderBy('created', 'desc'))
        const querySnapshot = await getDocs(q)
        const updatedOrders = []
        querySnapshot.forEach(doc => {
          updatedOrders.push({
            id: doc.id,
            data: doc.data()
          })
        })
        dispatch(setOrders(updatedOrders))
      }
      try {
        fetchOrders()
      } catch (e) {
        console.error(e)
        dispatch(setError(e.response.data))
      }
    } else {
      dispatch(setOrders([]))
    }
  }
}
