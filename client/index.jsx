import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app.jsx'

import.meta.webpackHot?.accept()

const root =
  window.reactRoot ??=
  ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
