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
    },
})

// Action creators are generated for each case reducer function
export const { setActiveKey } = menuSlice.actions

export default menuSlice.reducer