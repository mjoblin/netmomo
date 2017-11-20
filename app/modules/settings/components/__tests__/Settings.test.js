import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from '../Settings';

const testSettings = {
    shiftyHost: 'localhost',
    shiftyPort: 11348,
};

const testActions = {
    setShiftyHost: () => {},
    setShiftyPort: () => {},
    shiftyConnect: () => {},
    shiftyDisconnect: () => {},
    shiftyCancelReconnect: () => {},
};

describe('Settings', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <Settings
                actions={testActions}
                settings={testSettings}
                shiftyConnectionStatus={'Connected'}
            />
        );

        expect(component).toMatchSnapshot();
    });
});