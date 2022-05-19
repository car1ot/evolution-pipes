import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const defaultTheme = {
    palette: {
        white: '#FFFFFF',

        purple1: '#BE6CFF',
        purple2: '#9B2BF3',
        purple3: '#7526B0',
    },
};

export type Theme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
