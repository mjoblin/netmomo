import React from 'react';
import { shallow } from 'enzyme';
import { Notifications } from '../Notifications';

describe('Notifications', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <Notifications
                hubConnectionStatus={'Connected'}
            />
        );

        expect(component).toMatchSnapshot();
    });
});