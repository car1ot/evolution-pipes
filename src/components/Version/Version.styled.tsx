import { styled } from '../../styled/styled';

export const VersionWrapper = styled.div`
    font-family: 'Rubik Regular';
    color: ${(p) => p.theme.palette.white};
    font-size: 14px;
    background: ${(p) => p.theme.palette.purple3};
    width: fit-content;
    padding: 6px;
    margin: auto;
    border-radius: 6px;
`;
