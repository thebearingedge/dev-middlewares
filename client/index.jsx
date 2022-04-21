import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from './lib/hash-router';
import App from './components/app';

let root;

if (process.env.NODE_ENV === 'development') {
  import.meta.webpackHot?.accept();
  root =
    window.REACT_APP_ROOT ??=
    ReactDOM.createRoot(document.querySelector('#root'));
} else {
  root = ReactDOM.createRoot(document.querySelector('#root'));
}

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
