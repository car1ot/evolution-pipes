import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPipesConnected, setPipesLevel, setPipesMap, setPipesRotate } from '../../store/pipes/pipes.slice';
import { RootState } from '../../store/store';
import { PipesGateway } from './Pipes.gateway';
import { Pipe, PipePreloader, PipeRow, PipeWrapper } from './Pipes.styled';
import { EVerifyResult } from './Pipes.type';

const PipesComponent = () => {
    const dispatch = useDispatch();
    const pipes = useSelector((state: RootState) => state.pipes);

    const [verifyResult, setVerifyResult] = React.useState<EVerifyResult>(EVerifyResult.NO_RESULT);

    const init = React.useCallback(async () => {
        await PipesGateway.init();
        const map = await PipesGateway.selectLevel(pipes.level);
        dispatch(setPipesMap(map));
        dispatch(setPipesConnected(true));
    }, [dispatch, pipes]);

    /**
     * Select level and load the map
     * @param force true will cleanup localStorage
     */
    const selectNextLevel = React.useCallback(async () => {
        const newLevel = pipes.level + 1;
        const map = await PipesGateway.selectLevel(newLevel);

        dispatch(setPipesLevel(newLevel));
        dispatch(setPipesMap(map));
    }, [dispatch, pipes]);

    /**
     * Verify level and try to step next
     */
    const verify = React.useCallback(async () => {
        setVerifyResult(EVerifyResult.PENDING);

        if (verifyResult === EVerifyResult.LIMIT) {
            PipesGateway.reset();
            await init();
        }

        try {
            const verify = await PipesGateway.verify();
            if (verify === EVerifyResult.OK) {
                selectNextLevel();
                setVerifyResult(EVerifyResult.NO_RESULT);
            } else {
                setVerifyResult(verify as EVerifyResult);
            }
        } catch (error) {
            setVerifyResult(EVerifyResult.NO_RESULT);
        }
    }, [selectNextLevel, verifyResult]);

    /**
     * Connect to gateway
     */
    React.useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    if (!pipes.map) {
        return (
            <PipeWrapper>
                <PipePreloader>🗺️ Loading map...</PipePreloader>
            </PipeWrapper>
        );
    }

    return (
        <PipeWrapper>
            {pipes.map.map((pipeRow, pipeRowIdx) => {
                return (
                    <PipeRow key={pipeRowIdx}>
                        {pipeRow.map((pipe, pipeIdx) => {
                            return (
                                <Pipe
                                    key={(pipeRowIdx + 1) * pipeIdx}
                                    onClick={() => {
                                        dispatch(setPipesRotate([pipeRowIdx, pipeIdx]));
                                    }}
                                >
                                    {pipe}
                                </Pipe>
                            );
                        })}
                    </PipeRow>
                );
            })}

            <button className="ripple-btn" onClick={verify} disabled={verifyResult === EVerifyResult.PENDING}>
                {verifyResult === EVerifyResult.NO_RESULT
                    ? 'Next level'
                    : verifyResult === EVerifyResult.PENDING
                    ? '💫 Loading'
                    : verifyResult === EVerifyResult.LIMIT
                    ? '10 attempts limit reached'
                    : '👿 Incorrect. Try again'}
            </button>
        </PipeWrapper>
    );
};

export default PipesComponent;
