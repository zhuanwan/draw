import { createSlice } from '@reduxjs/toolkit';

export const drawSlice = createSlice({
    name: 'draw',
    initialState: {
        cvs: null, // fabric canvas
        droppedItems: [],
    },
    reducers: {
        setCvs: (state, action) => {
            state.cvs = action.payload;
        },
        setDroppedItems: (state, action) => {
            state.droppedItems = [...state.droppedItems, action.payload];
        },
    },
});

export const { setCvs, setDroppedItems } = drawSlice.actions;

export default drawSlice.reducer;
