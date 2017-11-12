import React from 'react';
import { shallow } from 'enzyme';
import { PacketCount } from '../PacketCount';
import testData from './testData.json';

describe('PacketCount', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <PacketCount
                packetCounts={testData}
            />
        );

        expect(component).toMatchSnapshot();
    });
});