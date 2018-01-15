import reducer from '../reducer';
import arpPacketDumpling from './arpPacketDumpling.json';
import appModule from "AppRoot/modules/app";
import { HUB_DISCONNECTED, HUB_CONNECTING, HUB_CONNECTED,
    HUB_RECONNECTING } from "AppRoot/modules/app/constants";


const defaultState = {
    shiftyConnectionStatus: HUB_DISCONNECTED,
    dumplingsSeen: {},
};

describe('app reducer', () => {
    test('default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('HUB_CONNECTING action', () => {
        // The HUB_CONNECTING action should always result in a
        // HUB_CONNECTING status except when the status is already
        // HUB_RECONNECTING in which case it should stay as-is.
        const stateReconnecting = {
            ...defaultState,
            shiftyConnectionStatus: HUB_RECONNECTING,
        };

        expect(
            reducer(stateReconnecting, {
                type: appModule.actionTypes.HUB_CONNECTING,
            })
        ).toEqual(stateReconnecting);

        // Other statuses should change to HUB_CONNECTING.
        [HUB_CONNECTING, HUB_CONNECTED, HUB_DISCONNECTED].forEach(status => {
            expect(
                reducer({ ...defaultState, shiftyConnectionStatus: status }, {
                    type: appModule.actionTypes.HUB_CONNECTING,
                })
            ).toEqual({ ...defaultState, shiftyConnectionStatus: HUB_CONNECTING });
        });
    });

    test('HUB_CONNECTED action', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.HUB_CONNECTED,
            })
        ).toEqual({ ...defaultState, shiftyConnectionStatus: HUB_CONNECTED });
    });

    test('HUB_DISCONNECTED action', () => {
        expect(
            reducer({ ...defaultState, shiftyConnectionStatus: HUB_CONNECTED }, {
                type: appModule.actionTypes.HUB_DISCONNECTED,
            })
        ).toEqual({ ...defaultState, shiftyConnectionStatus: HUB_DISCONNECTED });
    });

    test('HUB_RECONNECT_ATTEMPT action', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.HUB_RECONNECT_ATTEMPT,
            })
        ).toEqual({ ...defaultState, shiftyConnectionStatus: HUB_RECONNECTING });
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