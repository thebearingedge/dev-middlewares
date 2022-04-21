import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from './lib/hash-router';
import App from './components/app';

import.meta.webpackHot?.accept();

const root =
  window.APP_ROOT ??=
  ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
