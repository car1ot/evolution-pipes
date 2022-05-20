import { GATEWAY_URL } from '../../constants/env.constants';
import { setPipesConnected, setPipesDisconnected } from '../../store/pipes/pipes.slice';
import { store } from '../../store/store';

export class PipesGateway {
    private static ws: WebSocket;

    public static get isWsOpen() {
        return this?.ws?.readyState === this.ws.OPEN ?? false;
    }

    /**
     *
     * @returns Promise when gateway is ready or throws error
     */
    public static async init() {
        const onOpen = new Promise<void>((resolve, reject) => {
            this.ws = new WebSocket(GATEWAY_URL);
            this.ws.onopen = () => resolve();
            this.ws.onclose = (e) => {
                console.log('close', e);
                if (e.code !== 1000) {
                    store.dispatch(setPipesDisconnected(true));
                }
                reject(e);
            };
            this.ws.onerror = (e) => {
                console.log('error', e);
                store.dispatch(setPipesDisconnected(true));
                reject(e);
            };
        });

        return Promise.all([onOpen]);
    }

    /**
     * Reset gateway
     */
    public static reset() {
        if (this.isWsOpen) {
            this.ws.close();
        }

        this.ws = null;

        store.dispatch(setPipesConnected(false));
    }

    private static sendCommand(command: string) {
        return new Promise<string>((resolve) => {
            let resolved = false;

            this.ws.onmessage = (e) => {
                const dividerIdx = e.data.indexOf(':');
                const data: string = e.data.slice(dividerIdx + 1).replaceAll(' ', '');
                if (!resolved) {
                    resolved = true;
                    resolve(data);
                }
            };
            this.ws.send(command);

            setTimeout(() => {
                if (!resolved) {
                    resolved = true;
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

        // const map = (await this.sendCommand('map'))
        //     .split('\n')
        //     .slice(1, -1)
        //     .map((row, rowIdx) => {
        //         const pipes = row.split('');
        //         for (let pipeIdx = 0; pipeIdx < pipes.length; pipeIdx++) {
        //             pipes[pipeIdx] = `${pipeIdx + rowIdx * 2 + 1 + 1 * rowIdx}${pipes[pipeIdx]}`;
        //         }
        //         return pipes;
        //     });

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
    public static async sendRotate(rowIdx: number, colIdx: number) {
        if (!this.isWsOpen) {
            return null;
        }

        return await this.sendCommand(`rotate ${colIdx} ${rowIdx}`);
    }
}
