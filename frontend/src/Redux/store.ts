import { configureStore } from '@reduxjs/toolkit'
import userReducer from './authSlice';
import initialPageReducer from './initialPageSlice'

export const store  = configureStore({
    reducer:{
        user:userReducer,
        initialPageSlice:initialPageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch