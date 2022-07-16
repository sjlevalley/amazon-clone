import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

export const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser } = userReducer.actions

export default userReducer.reducer
