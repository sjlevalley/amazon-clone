import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  submitting: null,
  loading: null,
  error: null
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
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoading, setSubmitting, setError } = uiReducer.actions

export default uiReducer.reducer
