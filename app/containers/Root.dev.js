import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import DevTools from './DevTools';
import history from '../history';
import routes from '../routes';


export default class Root extends Component {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                <div>
                    { routes }
                    <DevTools />
                </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
