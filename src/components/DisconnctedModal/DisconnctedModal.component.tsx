import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPipesDisconnected } from '../../store/pipes/pipes.slice';
import { RootState } from '../../store/store';
import UpperTextStyled from '../../styled/UpperText.styled';
import { PipesGateway } from '../Pipes/Pipes.gateway';
import { DisconnectedModalContent, DisconnectedModalOverlay } from './DisconnectedModal.styled';

const DisconnectedModalComponent = () => {
    const dispatch = useDispatch();
    const disconnected = useSelector((state: RootState) => state.pipes.disconnected);

    const reconnect = React.useCallback(() => {
        dispatch(setPipesDisconnected(false));
        PipesGateway.reset();
    }, [dispatch]);

    if (disconnected) {
        return (
            <DisconnectedModalOverlay>
                <DisconnectedModalContent>
                    <UpperTextStyled>❌ Disconnected from server</UpperTextStyled>
                    <button className="ripple-btn" onClick={reconnect}>
                        🔄 Try to reconnect
                    </button>
                </DisconnectedModalContent>
            </DisconnectedModalOverlay>
        );
    }

    return null;
};

export default DisconnectedModalComponent;
