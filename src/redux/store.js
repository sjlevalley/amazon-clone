import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/userReducer'
import basketReducer from './basketSlice/basketReducer'
import uiReducer from './uiSlice/uiReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    basket: basketReducer,
    ui: uiReducer
  }
})
