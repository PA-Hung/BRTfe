import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeKey: 'home'
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setActiveKey: (state, action) => {
            state.activeKey = action.payload;
        },
        setHomeKey: (state, action) => {
            state.activeKey = 'home';
        },
    },
})

// Action creators are generated for each case reducer function
export const { setActiveKey, setHomeKey } = menuSlice.actions

export default menuSlice.reducer