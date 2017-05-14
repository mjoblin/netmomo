import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import home from 'AppRoot/modules/home';
import history from 'AppRoot/services/history';


const App = () => (
    <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={home.components.Home} />
        </div>
    </ConnectedRouter>
);

export default App;
