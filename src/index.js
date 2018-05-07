import '@babel/polyfill';
// React
import React from 'react';
import { render } from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Components
import App from './App';

// Style
import './scss/index.scss';

const store = configureStore();

render(
   <Provider store={store}>
      <App />
   </Provider>,
   document.getElementById('app')
);
