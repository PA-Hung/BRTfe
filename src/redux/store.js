import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import authReducer from './slice/authSlice'
import userReducer from './slice/userSilce'
import menuReducer from './slice/menuSilce'
import searchUserReducer from './slice/searchUserSilce'
import searchTaskReducer from './slice/searchTaskSilce'
import themeReducer from './slice/themeSilce'

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    menu: menuReducer,
    theme: themeReducer,
    searchUser: searchUserReducer,
    searchTask: searchTaskReducer,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'menu'] // only navigation will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
