import reducer from '../reducer';
import packetDumpling from './packetDumpling.json';
import appModule from "AppRoot/modules/app";


const defaultState = {
    dumplingData: [],
};

describe('arp reducer', () => {
    test('default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('app-level DUMPLING action from ARPChef', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: packetDumpling,
            })
        ).toEqual({
            dumplingData: [{
                key: '02:02:02:02:02:02_01:01:01:01:01:01_1509932219.2742',
                ...packetDumpling.payload,
            }],
        });
    });

    // The reducer should ignore dumplings from other chefs.
    test('app-level DUMPLING action from non-ARPChef', () => {
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