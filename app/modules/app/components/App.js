import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import away from 'AppRoot/modules/away';
import home from 'AppRoot/modules/home';
import history from 'AppRoot/services/history';


const App = () => (
    <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={home.components.Home} />
            <Route path="/away" component={away.components.Away} />
        </div>
    </ConnectedRouter>
);

export default App;
