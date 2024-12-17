import { configureStore } from '@reduxjs/toolkit';

import draw from './features/drawSlice';
import global from './features/globalSlice';
import history from './features/historySlice';

const store = configureStore({
    reducer: {
        global,
        history,
        draw,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
