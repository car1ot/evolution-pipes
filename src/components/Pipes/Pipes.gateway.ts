import { GATEWAY_URL } from '../../constants/env.constants';

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
            this.ws.onclose = (e) => reject(e);
            this.ws.onerror = (e) => reject(e);
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
    }

    private static sendCommand(command: string) {
        return new Promise<string>((resolve) => {
            this.ws.onmessage = (e) => {
                const dividerIdx = e.data.indexOf(':');
                const data: string = e.data.slice(dividerIdx + 1).replaceAll(' ', '');
                resolve(data);
            };
            this.ws.send(command);
        });
    }

    /**
     * Select level
     * @param l level number
     * @returns New level map
     */
    public static async selectLevel(l: number | string) {
        if (!this.isWsOpen) {
            return null;
        }

        const levelCommandResult = await this.sendCommand(`new ${l}`);
        if (levelCommandResult !== 'OK') {
            return null;
        }

        const map = (await this.sendCommand(`map`))
            .split('\n')
            .slice(1, -1)
            .map((row) => {
                return row.split('');
            });

        return map;
    }

    /**
     * Verify level
     */
    public static async verify() {
        if (!this.isWsOpen) {
            return null;
        }

        return await this.sendCommand(`verify`);
    }
}
