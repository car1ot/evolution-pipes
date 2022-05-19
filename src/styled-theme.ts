import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const defaultTheme = {
    palette: {
        white: '#ffffff',

        black1: '#274551',
    },
};

export type Theme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
