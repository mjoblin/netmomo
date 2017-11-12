import React from 'react';
import { shallow } from 'enzyme';
import { DNSLookup } from '../DNSLookup';

const testDNSLookups = [
    {
        key: 'two.com',
        host: 'two.com',
        count: 10,
        latest: 1509758701947.23,
    },
    {
        key: 'three.two.com',
        host: 'three.two.com',
        count: 3,
        latest: 1509758701932.883,
    },
    {
        key: 'four.three.two.com',
        host: 'four.three.two.com',
        count: 1,
        latest: 1509758701941.5847,
    },
];

describe('DNSLookup', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <DNSLookup
                dnsLookups={testDNSLookups}
                hostComponentLevels={0}
                actions={{}}
            />
        );

        expect(component).toMatchSnapshot();
    });
});