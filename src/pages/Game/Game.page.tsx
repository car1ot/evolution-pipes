import React from 'react';
import DisconnectedModalComponent from '../../components/DisconnctedModal/DisconnctedModal.component';

import NavigationComponent from '../../components/Navigation/Navigation.component';
import PipesComponent from '../../components/Pipes/Pipes.component';

import { GameWrapper } from './Game.styled';

const GamePage = () => {
    return (
        <GameWrapper>
            <DisconnectedModalComponent />
            <NavigationComponent />
            <PipesComponent />
        </GameWrapper>
    );
};

export default GamePage;
