import { blinking } from '../../styled/keyframes';
import { styled } from '../../styled/styled';

export const NavigationWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: ${(p) => p.theme.palette.purple3};
    padding: 20px;
    width: fit-content;
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
        color: ${(p) => p.theme.palette.white};
    }
`;

export const NavigationButtons = styled.div`
    margin-top: 20px;

    button {
        position: relative;
        text-align: center;
        cursor: pointer;
        min-width: 50px;
        min-height: 50px;
        border: none;
        outline: none;
        border-radius: 15px;
        margin-right: 15px;
        color: ${(p) => p.theme.palette.white};
        font-family: 'Rubik Medium';
        font-size: 30px;
        transition: 0.2s;
        background: ${(p) => p.theme.palette.purple2};

        &.current {
            background: ${(p) => p.theme.palette.purple1};
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
            right: -20px;
            width: 20px;
            height: 4px;
            background: ${(p) => p.theme.palette.purple2};
            margin: auto;
        }

        &:disabled {
            pointer-events: none;
        }
    }
`;
