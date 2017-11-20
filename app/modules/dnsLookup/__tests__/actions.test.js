import * as actions from '../actions';
import * as actionTypes from '../actionTypes';


describe('dnsLookup actions', () => {
    test('setHostComponentLevels', () => {
        const testLevels = 2;

        const expectedAction = {
            type: actionTypes.SET_HOST_COMPONENT_LEVELS,
            hostComponentLevels: testLevels,
        };

        expect(actions.setHostComponentLevels(testLevels)).toEqual(expectedAction);
    });

    test('setHostFilter', () => {
        const testFilter = 'foo';

        const expectedAction = {
            type: actionTypes.SET_HOST_FILTER,
            hostFilter: testFilter,
        };

        expect(actions.setHostFilter(testFilter)).toEqual(expectedAction);
    });
});
