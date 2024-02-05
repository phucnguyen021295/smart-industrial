import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {}

const initialState: AuthState = {}

export const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<object>) => {
            return {...state, ...action.payload}
        },
        logout: (state) => {
            return {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { update, logout } = authSlide.actions

export default authSlide.reducer