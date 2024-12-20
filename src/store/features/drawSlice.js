import { createSlice } from '@reduxjs/toolkit';

export const drawSlice = createSlice({
    name: 'draw',
    initialState: {
        cvsActiveObject: [], // 活动对象
        refreshNum: 0,
    },
    reducers: {
        setCvscActiveObject: (state, action) => {
            state.cvsActiveObject = action.payload;
        },
        setRefreshNum: (state, action) => {
            if (state.refreshNum > 1000000) {
                state.refreshNum = 0;
            } else {
                state.refreshNum = state.refreshNum + 1;
            }
        },
    },
});

export const { setCvscActiveObject, setRefreshNum } = drawSlice.actions;

export default drawSlice.reducer;
