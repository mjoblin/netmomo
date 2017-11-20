import reducer from '../reducer';
import packetDumpling from './packetDumpling.json';
import appModule from "AppRoot/modules/app";


const defaultState = {
    dumplingData: {},
    protocolFilter: '',
};

describe('packetCount reducer', () => {
    test('default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('app-level DUMPLING action from PacketCountChef', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: packetDumpling,
            })
        ).toEqual({
            ...defaultState,
            dumplingData: packetDumpling.payload.packet_counts,
        });
    });

    // The reducer should ignore dumplings from other chefs.
    test('app-level DUMPLING action from non-PacketCountChef', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: {
                    'metadata': {
                        'chef': 'SomeOtherChef',
                    },
                    'payload': {},
                }
            })
        ).toEqual(defaultState);
    });
});