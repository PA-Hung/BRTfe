import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'
import counterReducer from './slice/counterSlice'
import userReducer from './slice/userSilce'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        user: userReducer
    },
})


