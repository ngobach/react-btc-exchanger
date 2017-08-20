import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import Redux, { createStore } from 'redux';
import { Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import Actions from './actions';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(resp => resp.json())
    .then((data) => {
        const bpi = Object.values(data.bpi);
        store.dispatch(Actions.arrived(bpi));
    })
    .catch((err) => {
        console.error(err);
        store.dispatch(Actions.error(err.message));
    });
store.dispatch(Actions.pending());