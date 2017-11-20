import reducer from '../reducer';
import appModule from "AppRoot/modules/app";
import intervalDumpling from './intervalDumpling';


const defaultState = {
    'dumpling_eater_count': 0,
    'dumpling_eaters': [],
    'dumpling_kitchen_count': 0,
    'dumpling_kitchens': [],
    'server_uptime': 0,
    'total_dumplings_sent': 0,
};

describe('systemStatus reducer', () => {
    test('default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('app-level DUMPLING action from SystemStatusChef', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: intervalDumpling,
            })
        ).toEqual({ ...intervalDumpling.payload });
    });

    // The reducer should ignore dumplings from other chefs.
    test('app-level DUMPLING action from non-SystemStatusChef', () => {
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