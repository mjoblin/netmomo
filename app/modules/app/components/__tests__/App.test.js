import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('App', () => {
    [
        '/',
        '/arp',
        '/dnsLookup',
        '/packetCount',
        '/systemStatus',
        '/settings',
    ].forEach(route => {
        it(`matches snapshot for route ${route}`, () => {
            const component = shallow(
                <App
                    routerPath={route}
                />
            );

            expect(component).toMatchSnapshot();
        });
    });
});