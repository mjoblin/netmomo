import React from 'react';
import { shallow } from 'enzyme';
import { PacketCountTable } from '../PacketCountTable';
import testData from './testData.json';

describe('PacketCountTable', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <PacketCountTable
                packetCounts={testData}
            />
        );

        expect(component).toMatchSnapshot();
    });
});