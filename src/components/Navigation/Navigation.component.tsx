import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { pipesLevels } from '../../store/pipes/pipes.slice';
import { RootState } from '../../store/store';
import { NavigationButtons, NavigationWrapper } from './Navigation.styled';

const NavigationComponent = () => {
    const pipesLevel = useSelector((state: RootState) => state.pipes.level);

    return (
        <NavigationWrapper>
            <span>🕹️ Level {pipesLevel}</span>
            <NavigationButtons>
                {pipesLevels.map((level) => (
                    <button className={classNames({ current: pipesLevel === level })} key={level} disabled>
                        {level}
                    </button>
                ))}
            </NavigationButtons>
        </NavigationWrapper>
    );
};

export default NavigationComponent;
