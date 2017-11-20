import { getARP } from '../selectors';
import packetDumpling from './packetDumpling';


describe('arp selectors', () => {
    const testState = {
        arp: {
            dumplingData: packetDumpling
        },
        anotherKey: 10,
    };

    test('getARP', () => {
        expect(getARP(testState)).toEqual({ ...testState.arp.dumplingData });
    });
});
