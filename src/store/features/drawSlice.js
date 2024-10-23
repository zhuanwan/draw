import { createSlice } from '@reduxjs/toolkit';

export const drawSlice = createSlice({
    name: 'draw',
    initialState: {
        cvsActiveObjects: [], // 活动对象
    },
    reducers: {
        setCvscActiveObjects: (state, action) => {
            state.cvsActiveObjects = action.payload;
        },
    },
});

export const { setCvscActiveObjects } = drawSlice.actions;

export default drawSlice.reducer;
