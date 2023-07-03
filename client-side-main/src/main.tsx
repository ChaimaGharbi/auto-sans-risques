import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import 'core-js/es/promise'
import 'core-js/es/set'
import 'core-js/es/map'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
