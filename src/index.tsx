// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import React from 'react';
import ReactDOM from 'react-dom';
import './plugin/webfont';
import App from './container/App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import isDev from './utils/isDev';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const noop = (): void => {
    // do nothing.
};

if (!isDev) {
    console.log = noop;
    console.warn = noop;
}
