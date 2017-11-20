import { shiftyConnectionStatus, shiftyConnected } from '../selectors';
import { SHIFTY_DISCONNECTED, SHIFTY_CONNECTED } from "AppRoot/modules/app/constants";


describe('app selectors', () => {
    const testState = {
        app: {
            shiftyConnectionStatus: SHIFTY_DISCONNECTED,
            dumplingsSeen: {},
        },
        anotherKey: 10,
    };

    test('shiftyConnectionStatus', () => {
        expect(shiftyConnectionStatus(testState)).toEqual(SHIFTY_DISCONNECTED);
        testState.app.shiftyConnectionStatus = SHIFTY_CONNECTED;
        expect(shiftyConnectionStatus(testState)).toEqual(SHIFTY_CONNECTED);
    });

    test('shiftyConnected', () => {
        expect(shiftyConnected(testState)).toBe(true);
        testState.app.shiftyConnectionStatus = SHIFTY_DISCONNECTED;
        expect(shiftyConnected(testState)).toBe(false);
    });
});
