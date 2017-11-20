import React from 'react';
import { shallow } from 'enzyme';
import { Kitchens } from '../Kitchens';
import testData from './testData.json';

describe('Eaters', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <Kitchens
                kitchens={testData.dumpling_kitchens}
            />
        );

        expect(component).toMatchSnapshot();
    });
});