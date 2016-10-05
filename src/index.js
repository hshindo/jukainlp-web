import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import JukaiApp from './components/JukaiApp';
import settingNLP from './reducers';

const store = createStore(settingNLP);
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <JukaiApp />
    </Provider>,
    rootElement
);
