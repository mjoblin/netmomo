import React from 'react';
import { shallow } from 'enzyme';
import { ConnectionStatus } from '../ConnectionStatus';
import { HUB_CONNECTED } from "AppRoot/modules/app/constants";


describe('ConnectionStatus', () => {
    it('matches snapshot', () => {
        const component = shallow(
            <ConnectionStatus
                hubConnectionStatus={HUB_CONNECTED}
                hubConnected={true}
                settings={{ hubHost: 'localhost', hubPort: 11348 }}
                actions={{}}
            />
        );

        expect(component).toMatchSnapshot();
    });
});