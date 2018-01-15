import { shiftyConnectionStatus, shiftyConnected } from '../selectors';
import { HUB_DISCONNECTED, HUB_CONNECTED } from "AppRoot/modules/app/constants";


describe('app selectors', () => {
    const testState = {
        app: {
            shiftyConnectionStatus: HUB_DISCONNECTED,
            dumplingsSeen: {},
        },
        anotherKey: 10,
    };

    test('shiftyConnectionStatus', () => {
        expect(shiftyConnectionStatus(testState)).toEqual(HUB_DISCONNECTED);
        testState.app.shiftyConnectionStatus = HUB_CONNECTED;
        expect(shiftyConnectionStatus(testState)).toEqual(HUB_CONNECTED);
    });

    test('shiftyConnected', () => {
        expect(shiftyConnected(testState)).toBe(true);
        testState.app.shiftyConnectionStatus = HUB_DISCONNECTED;
        expect(shiftyConnected(testState)).toBe(false);
    });
});
