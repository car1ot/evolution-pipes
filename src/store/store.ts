import { configureStore } from '@reduxjs/toolkit';
import gatewaySlice from './gateway/gateway.slice';
import pipesSlice from './pipes/pipes.slice';

export const store = configureStore({
    reducer: {
        gateway: gatewaySlice,
        pipes: pipesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
