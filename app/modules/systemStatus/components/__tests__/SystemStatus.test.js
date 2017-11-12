import React from 'react';
import { shallow } from 'enzyme';
import { SystemStatus } from '../SystemStatus';
import testData from './testData.json';

describe('SystemStatus', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <SystemStatus
                systemStatus={testData}
            />
        );

        expect(component).toMatchSnapshot();
    });
});