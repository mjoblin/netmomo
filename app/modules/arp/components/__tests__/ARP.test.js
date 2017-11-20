import React from 'react';
import { shallow } from 'enzyme';
import { ARP } from '../ARP';

const testData = [
    {
        key: 'foo',
        data: {
            dst_hw: "01:01:01:01:01:01",
            dst_ip: "192.168.1.1",
            notes: "source device is new",
            operation: "reply",
            src_hw: "02:02:02:02:02:02",
            src_ip: "192.168.1.2",
            time: 1508700000.111111,
        },
    }
];

describe('ARP', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <ARP
                arp={testData}
            />
        );

        expect(component).toMatchSnapshot();
    });
});