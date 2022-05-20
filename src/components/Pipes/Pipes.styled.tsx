import styled from 'styled-components';
import pipesTiles from '../../assets/images/pipes-tiles.png';

export const PipesMainWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row-reverse;
    margin: auto;

    @media screen and (max-width: 860px) {
        flex-direction: column;
    }
`;

export const PipeChunkMap = styled.div<{ sizeLimit?: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background: ${(p) => p.theme.palette.purple3};
    padding: 20px;
    width: fit-content;
    margin: 30px 0 0 30px;
    border-radius: 30px;

    @media screen and (max-width: 860px) {
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        width: calc(100% - 40px);
    }

    ${(p) => {
        if (p.sizeLimit) {
            return `
                overflow: scroll;
                max-width: 520px;
                max-height: 610px;
            `;
        }
    }}
`;

export const PipeChunkMapRow = styled.div`
    display: flex;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const PipeChunkMapCol = styled.div`
    display: flex;
    background: ${(p) => p.theme.palette.purple2};
    min-width: 60px;
    min-height: 60px;
    margin-right: 10px;
    border-radius: 15px;
    transition: 0.2s;

    &.current {
        background: ${(p) => p.theme.palette.purple1};
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const PipeWrapper = styled.div<{ pending: number }>`
    display: flex;
    flex-direction: column;
    background: ${(p) => p.theme.palette.purple3};
    padding: 20px;
    border-radius: 30px;
    width: fit-content;
    margin: 30px 0;

    ${(p) => {
        if (!!p.pending) {
            return `
                & {
                    cursor: wait;
                }

                & * {
                    pointer-events: none;
                }
            `;
        }
    }}

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

    * {
        user-select: none;
    }
`;

export const PipeRow = styled.div`
    display: flex;
`;

export const Pipe = styled.div`
    position: relative;
    cursor: pointer;
    width: 60px;
    height: 60px;

    &:hover {
        background: ${(p) => p.theme.palette.purple1};
    }

    &:after {
        position: absolute;
        content: '';
        width: 60px;
        height: 60px;
        left: 0;
        background: url(${pipesTiles});
    }

    &[data-symbol='╸']:after {
        background-position: 120px 0px;
    }
    &[data-symbol='╹']:after {
        background-position: -60px -60px;
    }
    &[data-symbol='╺']:after {
        background-position: 60px 0px;
    }
    &[data-symbol='╻']:after {
        background-position: 60px -60px;
    }

    /* */

    &[data-symbol='━']:after {
        background-position: 0px 0px;
    }
    &[data-symbol='┃']:after {
        background-position: 0px -60px;
    }

    /* */

    &[data-symbol='┓']:after {
        background-position: 120px 60px;
    }
    &[data-symbol='┛']:after {
        background-position: 120px 120px;
    }
    &[data-symbol='┗']:after {
        background-position: 60px 120px;
    }
    &[data-symbol='┏']:after {
        background-position: 0px 60px;
    }

    /* */

    &[data-symbol='┣']:after {
        background-position: 0px -120px;
    }
    &[data-symbol='┳']:after {
        background-position: 60px 60px;
    }
    &[data-symbol='┫']:after {
        background-position: 60px -120px;
    }
    &[data-symbol='┻']:after {
        background-position: 120px -120px;
    }

    /* */

    &[data-symbol='╋']:after {
        background-position: 0px 120px;
    }
`;
