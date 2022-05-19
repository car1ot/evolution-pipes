import React from 'react';

import NavigationComponent from '../../components/Navigation/Navigation.component';
import PipesComponent from '../../components/Pipes/Pipes.component';

import { GameWrapper } from './Game.styled';

const GamePage = () => {
    return (
        <GameWrapper>
            <NavigationComponent />
            <PipesComponent />
        </GameWrapper>
    );
};

export default GamePage;
