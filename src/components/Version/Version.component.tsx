import preval from 'preval.macro';
import { VersionWrapper } from './Version.styled';
import { version } from '../../../package.json';

const buildTimestamp: number = preval`module.exports = Date.now();`;

export const VersionComponent = () => {
    return (
        <VersionWrapper>
            ⚙️ v. {version} t. {buildTimestamp}
        </VersionWrapper>
    );
};
