import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from '../Settings';

const testSettings = {
    hubHost: 'localhost',
    hubPort: 11348,
};

const testActions = {
    setHubHost: () => {},
    setHubPort: () => {},
    hubConnect: () => {},
    hubDisconnect: () => {},
    hubCancelReconnect: () => {},
};

describe('Settings', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <Settings
                actions={testActions}
                settings={testSettings}
                hubConnectionStatus={'Connected'}
            />
        );

        expect(component).toMatchSnapshot();
    });
});