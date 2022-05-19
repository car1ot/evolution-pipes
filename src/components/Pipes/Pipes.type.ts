export interface ICoordinate {
    x: number;
    y: number;
}

export type IGameMap = string[][];

export enum EVerifyResult {
    NO_RESULT = 'No result',
    INCORRECT = 'Incorrect.',
    PENDING = 'Pending',
    LIMIT = 'Only10verificationsallowedperattempt.',
}
