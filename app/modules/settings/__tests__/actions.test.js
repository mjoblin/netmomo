import * as actions from '../actions';
import * as actionTypes from '../actionTypes';


describe('settings actions', () => {
    test('setShiftyHost', () => {
        const testHost = 'foo.com';

        const expectedAction = {
            type: actionTypes.SET_SHIFTY_HOST,
            shiftyHost: testHost,
        };

        expect(actions.setShiftyHost(testHost)).toEqual(expectedAction);
    });

    test('setShiftyPort', () => {
        const testPort = 1234;

        const expectedAction = {
            type: actionTypes.SET_SHIFTY_PORT,
            shiftyPort: testPort,
        };

        expect(actions.setShiftyPort(testPort)).toEqual(expectedAction);
    });
});
