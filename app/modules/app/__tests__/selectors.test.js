import { hubConnectionStatus, hubConnected } from '../selectors';
import { HUB_DISCONNECTED, HUB_CONNECTED } from "AppRoot/modules/app/constants";


describe('app selectors', () => {
    const testState = {
        app: {
            hubConnectionStatus: HUB_DISCONNECTED,
            dumplingsSeen: {},
        },
        anotherKey: 10,
    };

    test('hubConnectionStatus', () => {
        expect(hubConnectionStatus(testState)).toEqual(HUB_DISCONNECTED);
        testState.app.hubConnectionStatus = HUB_CONNECTED;
        expect(hubConnectionStatus(testState)).toEqual(HUB_CONNECTED);
    });

    test('hubConnected', () => {
        expect(hubConnected(testState)).toBe(true);
        testState.app.hubConnectionStatus = HUB_DISCONNECTED;
        expect(hubConnected(testState)).toBe(false);
    });
});
