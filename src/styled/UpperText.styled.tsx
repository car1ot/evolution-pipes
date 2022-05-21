import { blinking } from './keyframes';
import { styled } from './styled';

export default styled.span<{ extraPadding?: number; notAnimated?: boolean }>`
    text-transform: uppercase;
    font-size: 18px;
    text-align: center;
    margin: auto;
    color: ${(p) => p.theme.palette.textWhite};
    animation: 2s ${blinking} infinite ease-in-out;

    ${(p) => p.notAnimated && `animation: none`};
    ${(p) => p.extraPadding && `padding: ${p.extraPadding}px`};
`;
