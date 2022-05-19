import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../styled-theme';
import { GlobalStyle } from './App.styled';

import '../../assets/styles/reset.css';
import '../../assets/styles/font.css';
import GamePage from '../../pages/Game/Game.page';

const AppContainer = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyle />
            <GamePage />
        </ThemeProvider>
    );
};

export default AppContainer;
