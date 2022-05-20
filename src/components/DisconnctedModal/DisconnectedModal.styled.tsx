import { styled } from '../../styled/styled';

export const DisconnectedModalOverlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    z-index: 99;
`;

export const DisconnectedModalContent = styled.div`
    background: ${(p) => p.theme.palette.purple3};
    border-radius: 30px;
    padding: 30px;

    button {
        display: block;
        cursor: pointer;
        background: ${(p) => p.theme.palette.purple1};
        color: ${(p) => p.theme.palette.white};
        font-family: 'Rubik Regular';
        font-size: 18px;
        border: none;
        padding: 15px;
        border-radius: 15px;
        margin-top: 20px;
        width: 100%;
    }
`;
