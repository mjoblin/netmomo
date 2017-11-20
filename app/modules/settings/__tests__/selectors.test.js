import { getSettings } from '../selectors';


describe('settings selectors', () => {
    test('getSettings', () => {
        const testState = {
            settings: {
                settingA: 'a',
                settingB: 'b',
            },
            anotherKey: 10,
        };

        expect(getSettings(testState)).toEqual({ ...testState.settings });
    });
});