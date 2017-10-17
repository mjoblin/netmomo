import { setShiftyHost, setShiftyPort } from '../actions';


describe('settings actions', () => {
    it('setShiftyHost', () => {
        const testHost = 'foo.com';
        const shiftyHostAction = setShiftyHost(testHost);

        expect(shiftyHostAction).toEqual({
            type: 'settings/SET_SHIFTY_HOST',
            shiftyHost: testHost,
        });
    });

    it('setShiftyPort', () => {
        const testPort = 1234;
        const shiftyPortAction = setShiftyPort(testPort);

        expect(shiftyPortAction).toEqual({
            type: 'settings/SET_SHIFTY_PORT',
            shiftyPort: testPort,
        });
    });
});
