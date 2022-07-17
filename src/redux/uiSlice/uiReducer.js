import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  submitting: null,
  loading: null,
  error: null,
  notification: {}
}

export const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSubmitting: (state, action) => {
      state.submitting = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
    clearNotification: (state, action) => {
      state.notification = {}
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setSubmitting,
  setError,
  setNotification,
  clearNotification
} = uiReducer.actions

export default uiReducer.reducer
