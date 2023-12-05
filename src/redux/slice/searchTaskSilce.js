import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAllTaskListByUser } from '../../utils/api'

export const fetchTaskPublic = createAsyncThunk(
    'searchTask/fetchTaskPublic',
    async ({ query }) => {
        const response = await getAllTaskListByUser(query)
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

export const searchTaskSilce = createSlice({
    name: 'searchTask',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTaskPublic.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchTaskPublic.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchTaskPublic.fulfilled, (state, action) => {
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
export const { } = searchTaskSilce.actions

export default searchTaskSilce.reducer