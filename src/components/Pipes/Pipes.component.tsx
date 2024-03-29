import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GatewayHelper } from '../../helpers/gateway.helper';
import { EGatewayStatus } from '../../store/gateway/gateway.slice';
import {
    setPipesClearRotate,
    setPipesLevel,
    setPipesMap,
    setPipesMapChunk,
    setPipesRotate,
} from '../../store/pipes/pipes.slice';
import { RootState } from '../../store/store';
import UpperTextStyled from '../../styled/UpperText.styled';
import {
    Pipe,
    PipeChunkMap,
    PipeChunkMapCol,
    PipeChunkMapRow,
    PipeRow,
    PipesMainWrapper,
    PipeWrapper,
} from './Pipes.styled';

export enum EVerifyResult {
    NO_RESULT = 'No result',
    INCORRECT = 'Incorrect.',
    PENDING = 'Pending',
    LIMIT = 'Only10verificationsallowedperattempt.',
}

const PipesComponent = () => {
    const dispatch = useDispatch();
    const gateway = useSelector((state: RootState) => state.gateway);
    const pipes = useSelector((state: RootState) => state.pipes);

    const [verifyResult, setVerifyResult] = React.useState<EVerifyResult>(EVerifyResult.NO_RESULT);

    /**
     * Connect to the server and init pipes state
     */
    const init = React.useCallback(async () => {
        await GatewayHelper.init();
        const map = await GatewayHelper.sendLevel(pipes.level);
        dispatch(setPipesMap(map));
    }, [dispatch, pipes]);

    /**
     * Select level and load the map
     */
    const nextLevel = React.useCallback(async () => {
        const newLevel = pipes.level + 1;
        const map = await GatewayHelper.sendLevel(newLevel);

        dispatch(setPipesLevel(newLevel));
        dispatch(setPipesMap(map));
    }, [dispatch, pipes]);

    /**
     * Verify level and try to step next
     */
    const verifyLevel = React.useCallback(async () => {
        setVerifyResult(EVerifyResult.PENDING);

        if (verifyResult === EVerifyResult.LIMIT) {
            GatewayHelper.reset();
            await init();
        }

        await GatewayHelper.sendRotate(pipes.mapRotations);
        dispatch(setPipesClearRotate());

        try {
            const verify = await GatewayHelper.sendVerify();
            if (verify === null) {
                throw new Error('Verify is null');
            } else if (verify !== EVerifyResult.INCORRECT && verify !== EVerifyResult.LIMIT) {
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
    }, [dispatch, nextLevel, verifyResult, init, pipes]);

    /**
     * Rotate pipe
     */
    const editRotate = React.useCallback(
        async (rowIdx: number, colIdx: number, rowChunkOffset: number, colChunkOffset: number) => {
            try {
                dispatch(setPipesRotate([rowIdx + rowChunkOffset, colIdx + colChunkOffset]));
            } catch (error) {}
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
        if (gateway.status === EGatewayStatus.NOT_CONNECTED) {
            init();
        }
        // eslint-disable-next-line
    }, [gateway.status]);

    if (!pipes.map) {
        return (
            <PipesMainWrapper>
                <PipeWrapper>
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
            {(chunkOffset.rowsMax > 1 || chunkOffset.colsMax > 1) && (
                <PipeChunkMap sizeLimit={chunkOffset.rowsMax > 7 || chunkOffset.colsMax > 7}>
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
            <PipeWrapper>
                <UpperTextStyled extraPadding={20}>🧠 Solve pipes puzzle</UpperTextStyled>

                {pipes.map.slice(chunkOffset.rows[0], chunkOffset.rows[1]).map((row, rowIdx) => (
                    <PipeRow key={rowIdx}>
                        {row.slice(chunkOffset.cols[0], chunkOffset.cols[1]).map((col, colIdx) => (
                            <Pipe
                                key={(rowIdx + 1) * colIdx}
                                onClick={() => {
                                    editRotate(rowIdx, colIdx, chunkOffset.rows[0], chunkOffset.cols[0]);
                                }}
                                data-symbol={col}
                            />
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
