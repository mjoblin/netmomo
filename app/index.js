import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import { Provider } from 'react-redux';

import app from './modules/app';
import store from './store';


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <MuiThemeProvider>
                <Provider store={store}>
                    <Component />
                </Provider>
            </MuiThemeProvider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(app.components.App);

if (module.hot) {
    module.hot.accept('./modules/app', () => { render(app.components.App) });
}
