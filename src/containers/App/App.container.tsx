import React from 'react';
import { ThemeProvider } from 'styled-components';

import GamePage from '../../pages/Game/Game.page';

import { defaultTheme } from '../../styled/styled';
import { GlobalStyle, GlobalWrapper } from './App.styled';

import '../../assets/styles/reset.css';
import '../../assets/styles/font.css';

const AppContainer = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <GlobalWrapper>
                <GamePage />
            </GlobalWrapper>
        </ThemeProvider>
    );
};

export default AppContainer;
