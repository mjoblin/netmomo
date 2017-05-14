import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';

import Root from './containers/Root';
import store from './store';


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component store={store} />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./containers/Root', () => { render(Root) });
}
