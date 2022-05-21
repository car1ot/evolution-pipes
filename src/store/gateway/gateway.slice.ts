import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EGatewayStatus {
    NOT_CONNECTED = 'not_connected',
    CONNECTED = 'connected',
    DISCONNECTED = 'disconnected',
}

export interface GatewayState {
    status: EGatewayStatus;
    locked: boolean;
}

const initialState: GatewayState = {
    status: EGatewayStatus.NOT_CONNECTED,
    locked: false,
};

export const gatewaySlice = createSlice({
    name: 'gateway',
    initialState,
    reducers: {
        setGatewayStatus: (state, action: PayloadAction<EGatewayStatus>) => {
            state.status = action.payload;
        },
        setGatewayLocked: (state, action: PayloadAction<boolean>) => {
            state.locked = action.payload;
        },
    },
});

export const { setGatewayStatus, setGatewayLocked } = gatewaySlice.actions;

export default gatewaySlice.reducer;
