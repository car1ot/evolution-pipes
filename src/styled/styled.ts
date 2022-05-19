import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const defaultTheme = {
    palette: {
        white: '#FFFFFF',

        purple1: '#B677E8',
        purple2: '#9B2BF3',
        purple3: '#8539C1',
    },
};

export type Theme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
