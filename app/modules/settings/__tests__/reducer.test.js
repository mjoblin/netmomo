import reducer from '../reducer';
import * as actionTypes from '../actionTypes';


const defaultState = {
    shiftyHost: 'localhost',
    shiftyPort: 11348,
};

describe('settings reducer', () => {
    test('initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('settings/SET_SHIFTY_HOST action', () => {
        const testHost = 'testHost';

        expect(
            reducer(defaultState, {
                type: actionTypes.SET_SHIFTY_HOST,
                shiftyHost: testHost,
            })
        ).toEqual({
            ...defaultState,
            shiftyHost: testHost,
        });
    });

    test('settings/SET_SHIFTY_PORT action', () => {
        const testPort = 99;

        expect(
            reducer(defaultState, {
                type: actionTypes.SET_SHIFTY_PORT,
                shiftyPort: testPort,
            })
        ).toEqual({
            ...defaultState,
            shiftyPort: testPort,
        });
    });
});