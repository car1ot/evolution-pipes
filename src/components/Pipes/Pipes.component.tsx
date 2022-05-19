import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setPipesConnected,
    setPipesLevel,
    setPipesMap,
    setPipesMapChunk,
    setPipesRotate,
} from '../../store/pipes/pipes.slice';
import { RootState } from '../../store/store';
import UpperTextStyled from '../../styled/UpperText.styled';
import { PipesGateway } from './Pipes.gateway';
import {
    Pipe,
    PipeChunkMap,
    PipeChunkMapCol,
    PipeChunkMapRow,
    PipeRow,
    PipesMainWrapper,
    PipeWrapper,
} from './Pipes.styled';
import { EVerifyResult } from './Pipes.type';

const PipesComponent = () => {
    const dispatch = useDispatch();
    const pipes = useSelector((state: RootState) => state.pipes);

    const [verifyResult, setVerifyResult] = React.useState<EVerifyResult>(EVerifyResult.NO_RESULT);
    const [rotatePending, setRotatePending] = React.useState<number>(0);

    const init = React.useCallback(async () => {
        await PipesGateway.init();
        const map = await PipesGateway.sendLevel(pipes.level);
        dispatch(setPipesMap(map));
        dispatch(setPipesConnected(true));
    }, [dispatch, pipes]);

    /**
     * Select level and load the map
     * @param force true will cleanup localStorage
     */
    const nextLevel = React.useCallback(async () => {
        const newLevel = pipes.level + 1;
        const map = await PipesGateway.sendLevel(newLevel);

        dispatch(setPipesLevel(newLevel));
        dispatch(setPipesMap(map));
    }, [dispatch, pipes]);

    /**
     * Verify level and try to step next
     */
    const verifyLevel = React.useCallback(async () => {
        setVerifyResult(EVerifyResult.PENDING);

        if (verifyResult === EVerifyResult.LIMIT) {
            PipesGateway.reset();
            await init();
        }

        try {
            const verify = await PipesGateway.sendVerify();
            if (verify !== EVerifyResult.INCORRECT && verify !== EVerifyResult.LIMIT) {
                nextLevel();
                setVerifyResult(EVerifyResult.NO_RESULT);

                try {
                    alert(verify);
                } catch {}
            } else {
                setVerifyResult(verify as EVerifyResult);
            }
        } catch (error) {
            setVerifyResult(EVerifyResult.NO_RESULT);
        }
    }, [nextLevel, verifyResult, init]);

    /**
     * Rotate pipe
     */
    const editRotate = React.useCallback(
        async (rowIdx: number, colIdx: number, rowChunkOffset: number, colChunkOffset: number) => {
            setRotatePending(1);
            try {
                const rotate = await PipesGateway.sendRotate(rowIdx + rowChunkOffset, colIdx + colChunkOffset);
                if (rotate === 'OK') {
                    dispatch(setPipesRotate([rowIdx + rowChunkOffset, colIdx + colChunkOffset]));
                }
            } finally {
                setRotatePending(0);
            }
        },
        [dispatch],
    );

    /**
     * Select chunk if game field is too big
     */
    const selectMapChunk = React.useCallback(
        (rowIdx: number, colIdx: number) => {
            dispatch(setPipesMapChunk([rowIdx, colIdx]));
        },
        [dispatch],
    );

    /**
     * Connect to gateway
     */
    React.useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    if (!pipes.map) {
        return (
            <PipesMainWrapper>
                <PipeWrapper pending={1}>
                    <UpperTextStyled extraPadding={20}>🗺️ Loading map...</UpperTextStyled>
                </PipeWrapper>
            </PipesMainWrapper>
        );
    }

    const chunkOffset = {
        rows: [8 * pipes.mapChunk[0], 8 + 8 * pipes.mapChunk[0]],
        cols: [8 * pipes.mapChunk[1], 8 + 8 * pipes.mapChunk[1]],
        rowsMax: Math.ceil(pipes.map.length / 8),
        colsMax: Math.ceil(pipes.map[0].length / 8),
    };

    return (
        <PipesMainWrapper>
            {chunkOffset.rowsMax > 1 && chunkOffset.colsMax > 1 && (
                <PipeChunkMap>
                    <UpperTextStyled extraPadding={20}>👹 Pipes map</UpperTextStyled>

                    {Array.from({ length: chunkOffset.rowsMax }, (_, rowIdx) => (
                        <PipeChunkMapRow key={rowIdx}>
                            {Array.from({ length: chunkOffset.rowsMax }, (_, colIdx) => (
                                <PipeChunkMapCol
                                    key={colIdx}
                                    className={classNames({
                                        current: rowIdx === pipes.mapChunk[0] && colIdx === pipes.mapChunk[1],
                                    })}
                                    onClick={() => {
                                        selectMapChunk(rowIdx, colIdx);
                                    }}
                                />
                            ))}
                        </PipeChunkMapRow>
                    ))}
                </PipeChunkMap>
            )}
            <PipeWrapper pending={rotatePending}>
                <UpperTextStyled extraPadding={20}>🧠 Solve pipes puzzle</UpperTextStyled>

                {pipes.map.slice(chunkOffset.rows[0], chunkOffset.rows[1]).map((row, rowIdx) => (
                    <PipeRow key={rowIdx}>
                        {row.slice(chunkOffset.cols[0], chunkOffset.cols[1]).map((col, colIdx) => (
                            <Pipe
                                key={(rowIdx + 1) * colIdx}
                                onClick={() => {
                                    editRotate(rowIdx, colIdx, chunkOffset.rows[0], chunkOffset.cols[0]);
                                }}
                            >
                                {col}
                            </Pipe>
                        ))}
                    </PipeRow>
                ))}

                <button className="ripple-btn" onClick={verifyLevel} disabled={verifyResult === EVerifyResult.PENDING}>
                    {verifyResult === EVerifyResult.NO_RESULT
                        ? 'Next level'
                        : verifyResult === EVerifyResult.PENDING
                        ? '💫 Loading'
                        : verifyResult === EVerifyResult.LIMIT
                        ? '10 attempts limit reached'
                        : '👿 Incorrect. Try again'}
                </button>
            </PipeWrapper>
        </PipesMainWrapper>
    );
};

export default PipesComponent;
