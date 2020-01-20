import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './Utils/icons'

import ServicePanel from './components/ServicePanel/ServicePanel'
import BackgroundChooser from './components/BackgroundChooser/BackgroundChooser'
import MapComponent from './components/MapComponent/MapComponent'
import MapContainer from './components/MapContainer/MapContainer'
import Legend from './components/Legend/Legend'

import configureStore from './Utils/configureStore'
import { Provider } from 'react-redux'

const initialState = {}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

export { ServicePanel, BackgroundChooser, MapComponent, MapContainer, Legend }
