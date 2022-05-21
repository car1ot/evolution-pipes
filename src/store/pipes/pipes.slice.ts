import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store2 from 'store2';
import { rotatePipe } from '../../components/Pipes/Pipes.util';

export type IGameMap = string[][];
export interface PipesState {
    level: number;
    map: IGameMap;
    mapChunk: [number, number];
    mapRotations: number[][];
}

export const pipesLevels = [1, 2, 3, 4, 5, 6];

const initialState: PipesState = {
    level: Number(store2.get('pipes::level')) || 1,
    map: null,
    mapChunk: [0, 0],
    mapRotations: [],
};

export const pipesSlice = createSlice({
    name: 'pipes',
    initialState,
    reducers: {
        setPipesMap: (state, action: PayloadAction<IGameMap>) => {
            state.map = action.payload;
        },
        setPipesRotate: (state, action: PayloadAction<[number, number]>) => {
            const [row, rowIndex] = action.payload;
            const newMap = [...state.map];
            newMap[row][rowIndex] = rotatePipe(newMap[row][rowIndex]);
            state.map = newMap;
            state.mapRotations = [...state.mapRotations, [row, rowIndex]];
        },
        setPipesClearRotate: (state) => {
            state.mapRotations = [];
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

export const { setPipesMap, setPipesRotate, setPipesClearRotate, setPipesLevel, setPipesMapChunk } = pipesSlice.actions;

export default pipesSlice.reducer;
