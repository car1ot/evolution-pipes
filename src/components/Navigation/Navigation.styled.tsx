import { blinking } from '../../styled/keyframes';
import { styled } from '../../styled/styled';

export const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: ${(p) => p.theme.palette.purpleDark};
    padding: 20px;
    width: 480px;
    border-radius: 30px;
    margin: auto;

    @media screen and (max-width: 860px) {
        width: calc(100% - 80px);
        align-items: center;
    }

    span {
        text-transform: uppercase;
        font-size: 18px;
        text-align: center;
        margin: auto;
        animation: 2s ${blinking} infinite ease-in-out;
        color: ${(p) => p.theme.palette.textWhite};
    }
`;

export const NavigationButtons = styled.div`
    margin: 20px auto auto auto;

    button {
        position: relative;
        text-align: center;
        cursor: pointer;
        min-width: 50px;
        min-height: 50px;
        border: none;
        outline: none;
        border-radius: 15px;
        margin-right: 25px;
        color: ${(p) => p.theme.palette.textWhite};
        font-family: 'Rubik Medium';
        font-size: 30px;
        transition: 0.2s;
        background: ${(p) => p.theme.palette.purpleMain};

        &.current {
            background: ${(p) => p.theme.palette.purpleBright};
        }

        &:last-child {
            margin-right: 0;

            &:before {
                content: none;
            }
        }

        &:before {
            position: absolute;
            top: calc(50% - (4px / 2));
            content: '';
            right: -25px;
            width: 25px;
            height: 4px;
            background: ${(p) => p.theme.palette.purpleMain};
            margin: auto;
        }

        &:disabled {
            pointer-events: none;
        }
    }
`;
