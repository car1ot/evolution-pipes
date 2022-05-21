import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const defaultTheme = {
    palette: {
        textWhite: '#EFE7FD',

        purpleBright: '#B570EA',
        purpleMain: '#9429E6',
        purpleDark: '#7B22BF',
    },
};

export type Theme = typeof defaultTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
