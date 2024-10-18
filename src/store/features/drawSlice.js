import { createSlice } from '@reduxjs/toolkit';

export const drawSlice = createSlice({
    name: 'draw',
    initialState: {
        droppedItems: [],
    },
    reducers: {
        setDroppedItems: (state, action) => {
            state.droppedItems = [...state.droppedItems, action.payload];
        },
    },
});

export const { setDroppedItems } = drawSlice.actions;

export default drawSlice.reducer;
