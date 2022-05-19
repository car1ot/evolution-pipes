import { keyframes } from 'styled-components';

export const blinking = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.33;
    }

    100% {
        opacity: 1;
    }
`;

export const shaking = keyframes`
    0% {
        transform: rotate(3deg) scale(1.2);
    }

    50% {
        transform: rotate(-3deg) scale(1.2);
    }

    100% {
        transform: rotate(3deg) scale(1.2);
    }
`;
