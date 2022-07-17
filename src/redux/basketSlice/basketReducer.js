import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basket: [],
  clientSecret: null
}

export const basketReducer = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload]
    },
    emptyBasket: (state, action) => {
      state.basket = []
    },
    setClientSecret: (state, action) => {
      state.clientSecret = action.payload
    },
    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex(
        basketItem => basketItem.id === action.payload
      )
      let newBasket = [...state.basket]
      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        )
      }
      state.basket = newBasket
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  addToBasket,
  emptyBasket,
  removeFromBasket,
  setClientSecret
} = basketReducer.actions

export default basketReducer.reducer
