import reducer from '../reducer';
import arpPacketDumpling from './arpPacketDumpling.json';
import appModule from "AppRoot/modules/app";
import { SHIFTY_DISCONNECTED, SHIFTY_CONNECTING, SHIFTY_CONNECTED,
    SHIFTY_RECONNECTING } from "AppRoot/modules/app/constants";


const defaultState = {
    shiftyConnectionStatus: SHIFTY_DISCONNECTED,
    dumplingsSeen: {},
};

describe('app reducer', () => {
    test('default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('SHIFTY_CONNECTING action', () => {
        // The SHIFTY_CONNECTING action should always result in a
        // SHIFTY_CONNECTING status except when the status is already
        // SHIFTY_RECONNECTING in which case it should stay as-is.
        const stateReconnecting = {
            ...defaultState,
            shiftyConnectionStatus: SHIFTY_RECONNECTING,
        };

        expect(
            reducer(stateReconnecting, {
                type: appModule.actionTypes.SHIFTY_CONNECTING,
            })
        ).toEqual(stateReconnecting);

        // Other statuses should change to SHIFTY_CONNECTING.
        [SHIFTY_CONNECTING, SHIFTY_CONNECTED, SHIFTY_DISCONNECTED].forEach(status => {
            expect(
                reducer({ ...defaultState, shiftyConnectionStatus: status }, {
                    type: appModule.actionTypes.SHIFTY_CONNECTING,
                })
            ).toEqual({ ...defaultState, shiftyConnectionStatus: SHIFTY_CONNECTING });
        });
    });

    test('SHIFTY_CONNECTED action', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.SHIFTY_CONNECTED,
            })
        ).toEqual({ ...defaultState, shiftyConnectionStatus: SHIFTY_CONNECTED });
    });

    test('SHIFTY_DISCONNECTED action', () => {
        expect(
            reducer({ ...defaultState, shiftyConnectionStatus: SHIFTY_CONNECTED }, {
                type: appModule.actionTypes.SHIFTY_DISCONNECTED,
            })
        ).toEqual({ ...defaultState, shiftyConnectionStatus: SHIFTY_DISCONNECTED });
    });

    test('SHIFTY_RECONNECT_ATTEMPT action', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.SHIFTY_RECONNECT_ATTEMPT,
            })
        ).toEqual({ ...defaultState, shiftyConnectionStatus: SHIFTY_RECONNECTING });
    });

    test('DUMPLING action', () => {
        // Ensure the chef dumpling count starts at 1 properly.
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: arpPacketDumpling,
            })
        ).toEqual({ ...defaultState, dumplingsSeen: { 'ARPChef': 1 } });

        // Ensure the chef dumpling count increments properly.
        const testState = { ...defaultState, dumplingsSeen: { 'ARPChef': 1 } };
        expect(
            reducer(testState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: arpPacketDumpling,
            })
        ).toEqual({ ...testState, dumplingsSeen: { 'ARPChef': 2 } });
    });
});