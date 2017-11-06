import reducer from '../reducer';
import testARPPacketDumpling from './packetDumpling.json';


const defaultState = {
    dumplingData: [],
};

describe('arp reducer', () => {
    test('initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState);
    });

    test('app/DUMPLING action', () => {
        expect(
            reducer(defaultState, {
                type: 'app/DUMPLING',
                dumpling: testARPPacketDumpling,
            })
        ).toEqual({
            dumplingData: [{
                key: '02:02:02:02:02:02_01:01:01:01:01:01_1509932219145.2742',
                ...testARPPacketDumpling.payload,
            }],
        });
    });
});