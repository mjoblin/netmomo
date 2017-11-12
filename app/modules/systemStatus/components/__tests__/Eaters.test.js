import React from 'react';
import { shallow } from 'enzyme';
import { Eaters } from '../Eaters';
import testData from './testData.json';

describe('Eaters', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <Eaters
                eaters={testData.dumpling_eaters}
            />
        );

        expect(component).toMatchSnapshot();
    });
});