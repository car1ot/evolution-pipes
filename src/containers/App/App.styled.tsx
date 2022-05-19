import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { defaultTheme } from '../../styled-theme';

export const GlobalStyle = React.memo(createGlobalStyle<{
    theme: typeof defaultTheme;
}>`
    html,
    body {
        font-family: 'Rubik Regular';
    }

    #root {
        height: 100vh;
        width: 100vw;
        box-sizing: border-box;
    }
`);
