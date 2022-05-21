import { GATEWAY_URL } from '../constants/env.constants';
import { EGatewayStatus, setGatewayLocked, setGatewayStatus } from '../store/gateway/gateway.slice';
import { store } from '../store/store';

export class GatewayHelper {
    private static wsConnection: WebSocket;

    public static get isWsOpen() {
        return this?.wsConnection?.readyState === this?.wsConnection?.OPEN ?? false;
    }

    /**
     * Enstablish connection
     * @returns Promise when gateway is ready or throws error
     */
    public static async init() {
        return new Promise<void>((resolve) => {
            this.wsConnection = new WebSocket(GATEWAY_URL);
            this.wsConnection.onopen = () => {
                store.dispatch(setGatewayStatus(EGatewayStatus.CONNECTED));
                resolve();
            };
            this.wsConnection.onclose = (e) => {
                console.log('close', e);
                if (e.code !== 1000) {
                    store.dispatch(setGatewayStatus(EGatewayStatus.DISCONNECTED));
                }
                resolve();
            };
            this.wsConnection.onerror = (e) => {
                console.log('error', e);
                store.dispatch(setGatewayStatus(EGatewayStatus.DISCONNECTED));
                resolve();
            };
        });
    }

    /**
     * Reset everything
     */
    public static reset() {
        if (this.isWsOpen) {
            this.wsConnection.close();
        }
        store.dispatch(setGatewayStatus(EGatewayStatus.NOT_CONNECTED));
    }

    /**
     *
     * @param command
     * @returns `string` data or `null` if errored
     */
    private static async sendCommand(command: string) {
        // * Not the best solution! I need to prevent app state breach of integrity.
        if (store.getState().gateway.locked) {
            await new Promise((resolve) => {
                const awaiter = setInterval(() => {
                    if (!store.getState().gateway.locked) {
                        clearInterval(awaiter);
                        resolve(true);
                    }
                }, 1e3);
            });
        }

        store.dispatch(setGatewayLocked(true));

        return new Promise<string>((resolve) => {
            let resolved = false;
            this.wsConnection.onmessage = (e) => {
                const dividerIdx = e.data.indexOf(':');
                const data: string = e.data.slice(dividerIdx + 1).replaceAll(' ', '');
                if (!resolved) {
                    resolved = true;
                    store.dispatch(setGatewayLocked(false));
                    resolve(data);
                }
            };
            this.wsConnection.send(command);
            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    store.dispatch(setGatewayLocked(false));
                    resolve(null);
                }
            }, 10e3);
        });
    }

    /**
     * Send level number select
     * @param l level number
     * @returns New level map
     */
    public static async sendLevel(l: number | string) {
        if (!this.isWsOpen) {
            return null;
        }

        const levelCommandResult = await this.sendCommand(`new ${l}`);
        if (levelCommandResult !== 'OK') {
            return null;
        }

        const map = (await this.sendCommand('map'))
            .split('\n')
            .slice(1, -1)
            .map((row) => row.split(''));

        return map;
    }

    /**
     * Send level verify
     */
    public static async sendVerify() {
        if (!this.isWsOpen) {
            return null;
        }

        return await this.sendCommand('verify');
    }

    /**
     * Send pipe rotate
     */
    public static async sendRotate(rotations: number[][]) {
        if (!this.isWsOpen) {
            return null;
        }

        let command = 'rotate';
        const packetOffset = 200e3;

        for (let i = 0; i < Math.ceil(rotations.length / packetOffset); i++) {
            const offsetRotations = rotations.slice(i * packetOffset, (i + 1) * packetOffset);

            for (let j = 0; j < offsetRotations.length; j++) {
                const [row, col] = offsetRotations[j];
                command += command.length > 8 ? `\n${col} ${row}` : ` ${col} ${row}`;
            }

            await this.sendCommand(command);
        }

        const map = await this.sendCommand('map');
        console.log(map);

        return true;
    }
}
