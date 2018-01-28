import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';

describe('Home', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <Home
                hubConnected={false}
                settings={{}}
            />
        );

        expect(component).toMatchSnapshot();
    });
});