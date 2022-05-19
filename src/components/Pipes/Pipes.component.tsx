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

    const editRotate = React.useCallback(
        async (pipeRowIdx: number, pipeIdx: number) => {
            setRotatePending(1);
            try {
                const rotate = await PipesGateway.sendRotate(pipeRowIdx, pipeIdx);
                if (rotate === 'OK') {
                    dispatch(setPipesRotate([pipeRowIdx, pipeIdx]));
                }
            } finally {
                setRotatePending(0);
            }
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
            <PipeWrapper pending={1}>
                <PipePreloader>🗺️ Loading map...</PipePreloader>
            </PipeWrapper>
        );
    }

    return (
        <PipeWrapper pending={rotatePending}>
            {pipes.map.map((pipeRow, pipeRowIdx) => (
                <PipeRow key={pipeRowIdx}>
                    {pipeRow.map((pipe, pipeIdx) => (
                        <Pipe
                            key={(pipeRowIdx + 1) * pipeIdx}
                            onClick={() => {
                                editRotate(pipeRowIdx, pipeIdx);
                            }}
                        >
                            {pipe}
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
    );
};

export default PipesComponent;
