import styled from 'styled-components';

export const PipeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: ${(p) => p.theme.palette.purple3};
    padding: 20px;
    border-radius: 30px;
    width: fit-content;
    margin: 30px auto;

    button {
        cursor: pointer;
        background: ${(p) => p.theme.palette.purple1};
        color: ${(p) => p.theme.palette.white};
        font-family: 'Rubik Regular';
        font-size: 18px;
        border: none;
        padding: 15px;
        border-radius: 15px;
        margin-top: 20px;

        &:disabled {
            pointer-events: none;
        }
    }
`;

export const PipePreloader = styled.div`
    text-transform: uppercase;
    padding: 20px;
    border-radius: 15px;
    color: ${(p) => p.theme.palette.white};
`;

export const PipeRow = styled.div`
    display: flex;
`;

export const Pipe = styled.div`
    cursor: pointer;
    text-align: center;
    color: ${(p) => p.theme.palette.white};
    font-size: 50px;
    line-height: 60px;
    width: 60px;
    height: 60px;
    user-select: none;

    &:hover {
        background: ${(p) => p.theme.palette.purple1};
    }
`;
