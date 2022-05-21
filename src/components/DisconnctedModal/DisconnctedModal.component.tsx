import React from 'react';
import { useSelector } from 'react-redux';
import { GatewayHelper } from '../../helpers/gateway.helper';
import { EGatewayStatus } from '../../store/gateway/gateway.slice';
import { RootState } from '../../store/store';
import UpperTextStyled from '../../styled/UpperText.styled';
import { DisconnectedModalContent, DisconnectedModalOverlay } from './DisconnectedModal.styled';

const DisconnectedModalComponent = () => {
    const gatewayStatus = useSelector((state: RootState) => state.gateway.status);

    const reconnect = React.useCallback(() => {
        GatewayHelper.reset();
    }, []);

    if (gatewayStatus === EGatewayStatus.DISCONNECTED) {
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
