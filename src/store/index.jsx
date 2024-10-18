import { configureStore } from '@reduxjs/toolkit';

import draw from './features/drawSlice';
import global from './features/globalSlice';

const store = configureStore({
    reducer: {
        global,
        draw,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
