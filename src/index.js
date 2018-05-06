import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './scss/index.scss';

render(<App />, document.getElementById('app'));
