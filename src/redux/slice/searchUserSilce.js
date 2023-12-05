import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllUsersWithTask } from '../../utils/api'

export const fetchUserPublic = createAsyncThunk(
    'searchUser/fetchUserPublic',
    async ({ query }) => {
        const response = await getAllUsersWithTask(query)
        return response
    }
)

const initialState = {
    isFetching: true,
    meta: {
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    },
    result: []
}

export const searchUserSlice = createSlice({
    name: 'searchUser',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserPublic.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchUserPublic.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchUserPublic.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                state.meta = action.payload.data.meta;
                state.result = action.payload.data.result;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = searchUserSlice.actions

export default searchUserSlice.reducer