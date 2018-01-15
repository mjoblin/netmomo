import * as actions from '../actions';
import * as actionTypes from '../actionTypes';


describe('settings actions', () => {
    test('setHubHost', () => {
        const testHost = 'foo.com';

        const expectedAction = {
            type: actionTypes.SET_HUB_HOST,
            shiftyHost: testHost,
        };

        expect(actions.setHubHost(testHost)).toEqual(expectedAction);
    });

    test('setHubPort', () => {
        const testPort = 1234;

        const expectedAction = {
            type: actionTypes.SET_HUB_PORT,
            shiftyPort: testPort,
        };

        expect(actions.setHubPort(testPort)).toEqual(expectedAction);
    });
});
