import reducer from '../reducer';


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
        expect(
            reducer(defaultState, {
                type: 'settings/SET_SHIFTY_HOST',
                shiftyHost: 'testhost'
            })
        ).toEqual({
            shiftyHost: 'testhost',
            shiftyPort: 11348,
        });
    });

    test('settings/SET_SHIFTY_PORT action', () => {
        expect(
            reducer(defaultState, {
                type: 'settings/SET_SHIFTY_PORT',
                shiftyPort: 99,
            })
        ).toEqual({
            shiftyHost: 'localhost',
            shiftyPort: 99,
        });
    });
});