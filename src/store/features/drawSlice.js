import { createSlice } from '@reduxjs/toolkit';

export const drawSlice = createSlice({
    name: 'draw',
    initialState: {
        cvsActiveObject: undefined, // 活动对象
        scale: 1, // 缩放
        isLockScale: false, // 是否锁定缩放
        isOptInCanvas: false, // 操作是否在canvas里面
    },
    reducers: {
        setCvscActiveObject: (state, action) => {
            state.cvsActiveObject = action.payload;
        },
        setIsOptInCanvas: (state, action) => {
            state.isOptInCanvas = action.payload;
        },
        setScale: (state, action) => {
            state.scale = action.payload;
        },
        setIsLockScale: (state, action) => {
            state.isLockScale = action.payload;
        },
    },
});

export const { setCvscActiveObject, setIsOptInCanvas, setScale, setIsLockScale } = drawSlice.actions;

export default drawSlice.reducer;
