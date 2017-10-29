import { setShiftyHost, setShiftyPort } from '../actions';


describe('settings actions', () => {
    test('setShiftyHost', () => {
        const testHost = 'foo.com';

        expect(setShiftyHost(testHost)).toEqual({
            type: 'settings/SET_SHIFTY_HOST',
            shiftyHost: testHost,
        });
    });

    test('setShiftyPort', () => {
        const testPort = 1234;

        expect(setShiftyPort(testPort)).toEqual({
            type: 'settings/SET_SHIFTY_PORT',
            shiftyPort: testPort,
        });
    });
});
