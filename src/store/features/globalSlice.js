import { createSlice } from '@reduxjs/toolkit';

import { LoadStateEnum } from '@/const';

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        loadState: LoadStateEnum.LOADING,
    },
    reducers: {
        changeLoadState: (state, action) => {
            state.loadState = action.payload;
        },
    },
});

export const { changeLoadState } = globalSlice.actions;

export default globalSlice.reducer;
