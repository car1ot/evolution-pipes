import { configureStore } from '@reduxjs/toolkit';
import pipesSlice from './pipes/pipes.slice';

export const store = configureStore({
    reducer: {
        pipes: pipesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
