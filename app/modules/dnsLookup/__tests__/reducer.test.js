import reducer from '../reducer';
import * as actionTypes from '../actionTypes';
import appModule from 'AppRoot/modules/app';
import testIntervalDumpling from './intervalDumpling.json';
import testPacketDumpling from './packetDumpling.json';


const defaultState = {
    dumplingData: {},
    hostComponentLevels: 0,
    hostFilter: '',
};

describe('dnsLookup reducer', () => {
    test('default state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('interval DUMPLING action from DNSLookupChef', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: testIntervalDumpling,
            })
        ).toEqual({
            ...defaultState,
            dumplingData: testIntervalDumpling.payload.lookups_seen,
        });
    });

    // The reducer should ignore packet dumplings from DNSLookupChef.
    test('packet DUMPLING action from DNSLookupChef', () => {
        expect(
            reducer(defaultState, {
                type: appModule.actionTypes.DUMPLING,
                dumpling: testPacketDumpling,
            })
        ).toEqual(defaultState);
    });

    // The reducer should ignore dumplings from other chefs.
    test('DUMPLING action from non-DNSLookupChef', () => {
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

    test('SET_HOST_COMPONENT_LEVELS action', () => {
        const testLevels = 2;

        expect(
            reducer(defaultState, {
                type: actionTypes.SET_HOST_COMPONENT_LEVELS,
                hostComponentLevels: testLevels,
            })
        ).toEqual({
            ...defaultState,
            hostComponentLevels: testLevels,
        });
    });

    test('SET_HOST_FILTER action', () => {
        const testFilter = 'foo';

        expect(
            reducer(defaultState, {
                type: actionTypes.SET_HOST_FILTER,
                hostFilter: testFilter,
            })
        ).toEqual({
            ...defaultState,
            hostFilter: testFilter,
        });
    });
});
