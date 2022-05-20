import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store2 from 'store2';
import { IGameMap } from '../../components/Pipes/Pipes.type';
import { rotatePipe } from '../../components/Pipes/Pipes.util';

export interface PipesState {
    disconnected: boolean;
    connected: boolean;
    level: number;
    map: IGameMap;
    mapChunk: [number, number];
}

export const pipesLevels = [1, 2, 3, 4, 5, 6];

const initialState: PipesState = {
    disconnected: false,
    connected: false,
    level: Number(store2.get('pipes::level')) || 1,
    map: null,
    mapChunk: [0, 0],
};

export const pipesSlice = createSlice({
    name: 'pipes',
    initialState,
    reducers: {
        setPipesDisconnected: (state, action: PayloadAction<boolean>) => {
            state.disconnected = action.payload;
        },
        setPipesConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setPipesMap: (state, action: PayloadAction<IGameMap>) => {
            state.map = action.payload;
        },
        setPipesRotate: (state, action: PayloadAction<[number, number]>) => {
            const [row, rowIndex] = action.payload;
            const newMap = [...state.map];
            newMap[row][rowIndex] = rotatePipe(newMap[row][rowIndex]);
            state.map = newMap;
        },
        setPipesLevel: (state, action: PayloadAction<number>) => {
            state.level = action.payload;
            store2.set('pipes::level', state.level);
        },
        setPipesMapChunk: (state, action: PayloadAction<[number, number]>) => {
            state.mapChunk = action.payload;
        },
    },
});

export const { setPipesDisconnected, setPipesConnected, setPipesMap, setPipesRotate, setPipesLevel, setPipesMapChunk } =
    pipesSlice.actions;

export default pipesSlice.reducer;
