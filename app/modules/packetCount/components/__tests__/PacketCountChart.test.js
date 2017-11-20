import React from 'react';
import { shallow } from 'enzyme';
import { PacketCountChart } from '../PacketCountChart';

const testData = [
    {
        'x': 'Ethernet',
        'y': 150764,
        'width': 50
    },
    {
        'x': 'IP',
        'y': 149014,
        'width': 50
    },
    {
        'x': 'UDP',
        'y': 150494,
        'width': 50
    },
    {
        'x': 'Raw',
        'y': 150568,
        'width': 50
    },
    {
        'x': 'IPv6',
        'y': 1591,
        'width': 50
    },
    {
        'x': 'ARP',
        'y': 159,
        'width': 50
    },
    {
        'x': 'Padding',
        'y': 27,
        'width': 50
    },
    {
        'x': 'TCP',
        'y': 111,
        'width': 50
    },
];


describe('PacketCountChart', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <PacketCountChart
                data={testData}
            />
        );

        expect(component).toMatchSnapshot();
    });
});