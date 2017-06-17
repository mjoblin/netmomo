import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'react-hot-loader/patch';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import app from './modules/app';
import store from './store';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <LocaleProvider locale={enUS}>
                <Provider store={store}>
                    <Component />
                </Provider>
            </LocaleProvider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(app.components.App);

if (module.hot) {
    module.hot.accept('./modules/app', () => { render(app.components.App) });
}
