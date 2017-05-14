import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import home from 'AppRoot/modules/home';
// TODO: Only import DevTools if not in production?
import DevTools from 'AppRoot/services/DevTools';
import history from 'AppRoot/services/history';


const App = () => (
    <ConnectedRouter history={history}>
        <div>
            <Route exact path="/" component={home.components.Home} />
            {process.env.NODE_ENV !== 'production' ? <DevTools /> : null}
        </div>
    </ConnectedRouter>
);

export default App;
