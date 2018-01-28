import reducer from '../reducer';
import * as actionTypes from '../actionTypes';


const defaultState = {
    hubHost: 'localhost',
    hubPort: 11348,
};

describe('settings reducer', () => {
    test('initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('settings/SET_HUB_HOST action', () => {
        const testHost = 'testHost';

        expect(
            reducer(defaultState, {
                type: actionTypes.SET_HUB_HOST,
                hubHost: testHost,
            })
        ).toEqual({
            ...defaultState,
            hubHost: testHost,
        });
    });

    test('settings/SET_HUB_PORT action', () => {
        const testPort = 99;

        expect(
            reducer(defaultState, {
                type: actionTypes.SET_HUB_PORT,
                hubPort: testPort,
            })
        ).toEqual({
            ...defaultState,
            hubPort: testPort,
        });
    });
});