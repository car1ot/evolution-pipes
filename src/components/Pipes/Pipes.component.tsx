import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPipesConnected, setPipesMap, setPipesRotate } from '../../store/pipes/pipes.slice';
import { RootState } from '../../store/store';
import { PipesGateway } from './Pipes.gateway';
import { Pipe, PipePreloader, PipeRow, PipeWrapper } from './Pipes.styled';

const PipesComponent = () => {
    const dispatch = useDispatch();
    const pipes = useSelector((state: RootState) => state.pipes);

    const [verifyResult, setVerifyResult] = React.useState<'No result' | 'Incorrect.' | 'Pending'>('No result');

    const init = React.useCallback(async () => {
        await PipesGateway.init();

        if (pipes.level) {
            await PipesGateway.selectLevel(pipes.level);
        }

        dispatch(setPipesConnected(true));
    }, [dispatch, pipes]);

    /**
     * Select level and load the map
     * @param force true will cleanup localStorage
     */
    const selectLevel = React.useCallback(
        async (force: boolean = false) => {
            if (!force && pipes.map) {
                return;
            }

            await PipesGateway.selectLevel(pipes.level).then((map) => {
                dispatch(setPipesMap(map));
            });
        },
        [dispatch, pipes],
    );

    /**
     * Verify level and try to step next
     */
    const verify = React.useCallback(async () => {
        setVerifyResult('Pending');
        try {
            const verify = await PipesGateway.verify();
            setVerifyResult(verify as typeof verifyResult);
        } catch (error) {
            setVerifyResult('No result');
        }
    }, []);

    /**
     * Connect to gateway
     */
    React.useEffect(() => {
        init();
        // eslint-disable-next-line
    }, []);

    /**
     * Load map
     */
    React.useEffect(() => {
        if (!pipes.connected) {
            return;
        }

        selectLevel();
    }, [dispatch, pipes.connected, selectLevel]);

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

            <button className="ripple-btn" onClick={verify} disabled={verifyResult === 'Pending'}>
                {verifyResult === 'No result'
                    ? 'Next level'
                    : verifyResult === 'Pending'
                    ? '💫 Loading'
                    : '👿 Incorrect. Try again'}
            </button>
        </PipeWrapper>
    );
};

export default PipesComponent;
