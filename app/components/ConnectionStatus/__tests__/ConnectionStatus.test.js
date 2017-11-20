import React from 'react';
import { shallow } from 'enzyme';
import { ConnectionStatus } from '../ConnectionStatus';
import { SHIFTY_CONNECTED } from "AppRoot/modules/app/constants";


describe('ConnectionStatus', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <ConnectionStatus
                shiftyConnectionStatus={SHIFTY_CONNECTED}
                shiftyConnected={true}
                settings={{ shiftyHost: 'localhost', shiftyPort: 11348 }}
                actions={{}}
            />
        );

        expect(component).toMatchSnapshot();
    });
});