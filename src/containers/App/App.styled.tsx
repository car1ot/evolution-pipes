import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { defaultTheme, styled } from '../../styled/styled';

export const GlobalStyle = React.memo(createGlobalStyle<{
    theme: typeof defaultTheme;
}>`
    html,
    body {
        font-family: 'Rubik Regular';
        color: ${(p) => p.theme.palette.white};
    }

    #root {
        height: 100vh;
        width: 100%;
        box-sizing: border-box;
        background: ${(p) => p.theme.palette.purple2};
    }

    .ripple-btn {
        position: relative;
        overflow: hidden;
        transform: translate3d(0, 0, 0);

        &:after {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            background-image: radial-gradient(circle, #000 10%, transparent 10%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: scale(10, 10);
            opacity: 0;
            transition: transform .5s, opacity 1s;
        }

        &:active:after {
            transform: scale(0,0);
            opacity: .2;
            transition: 0s;
        }
    }
`);

export const GlobalWrapper = styled.div`
    max-width: 1440px;
    height: 100%;
    margin: auto;
    padding: 30px 0;
    box-sizing: border-box;
`;
