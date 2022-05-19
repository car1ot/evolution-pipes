import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import store2 from 'store2';
import { IGameMap } from '../../components/Pipes/Pipes.type';
import { rotatePipe } from '../../components/Pipes/Pipes.util';

export interface PipesState {
    connected: boolean;
    level: number;
    map: IGameMap;
}

export const pipesLevels = [1, 2, 3, 4, 5, 6];

const initialState: PipesState = {
    connected: false,
    level: Number(store2.get('pipes::level')) || 1,
    map: null,
};

export const pipesSlice = createSlice({
    name: 'pipes',
    initialState,
    reducers: {
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
    },
});

export const { setPipesConnected, setPipesMap, setPipesRotate, setPipesLevel } = pipesSlice.actions;

export default pipesSlice.reducer;
