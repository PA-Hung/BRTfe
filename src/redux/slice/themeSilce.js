import { createSlice } from '@reduxjs/toolkit'
import { theme } from 'antd';

const initialState = {
    themeMode: 'light',
    // themeConfig: {
    //     algorithm: theme.defaultAlgorithm,
    // }
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDarkTheme: (state, action) => {
            state.themeMode = action.payload;
            // state.themeConfig = {
            //     algorithm: theme.darkAlgorithm,
            // }
        },
        setLightTheme: (state, action) => {
            state.themeMode = action.payload;
            // state.themeConfig = {
            //     algorithm: theme.defaultAlgorithm,
            // }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDarkTheme, setLightTheme } = themeSlice.actions

export default themeSlice.reducer