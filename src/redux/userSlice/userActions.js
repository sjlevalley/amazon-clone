import { setUser } from './userReducer'
import { setSubmitting, setError } from '../uiSlice/uiReducer'
import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from '../../firebase-setup'

export const signInAction = (email, password, navigate) => {
    return async dispatch => {
        dispatch(setSubmitting(
            'login'
        ))
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
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
