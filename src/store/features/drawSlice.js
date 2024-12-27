import { createSlice } from '@reduxjs/toolkit';

export const drawSlice = createSlice({
    name: 'draw',
    initialState: {
        cvsActiveObject: undefined, // 活动对象
        refreshNum: 0,
        scale: 1, // 缩放
        isLockScale: false, // 是否锁定缩放
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
        setScale: (state, action) => {
            state.scale = action.payload;
        },
        setIsLockScale: (state, action) => {
            state.isLockScale = action.payload;
        },
    },
});

export const { setCvscActiveObject, setRefreshNum, setScale, setIsLockScale } = drawSlice.actions;

export default drawSlice.reducer;
