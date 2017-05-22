import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import app from './modules/app';
import store from './store';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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
