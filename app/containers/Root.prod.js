import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import routes from '../routes';


export default class Root extends Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <Router history={history} routes={routes} />
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
