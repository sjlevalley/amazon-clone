import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  orders: []
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setOrders: (state, action) => {
      state.orders = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setOrders } = userReducer.actions

export default userReducer.reducer
