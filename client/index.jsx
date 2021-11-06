import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.jsx'

import.meta.webpackHot?.accept()

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
