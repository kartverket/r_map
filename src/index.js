import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

import ServicePanel from './components/ServicePanel/ServicePanel'
import BackgroundChooser from './components/BackgroundChooser/BackgroundChooser'
import MapComponent from './components/MapComponent/MapComponent'
import MapContainer from './components/MapContainer/MapContainer'
import Legend from './components/Legend/Legend'

import { IntlProvider } from 'react-intl'
import messages_en from "./lang/en.json";
import messages_no from "./lang/no.json";

const messages = {
  'en': messages_en,
  'no': messages_no
};
const language = navigator.language.split(/[-_]/)[0]

ReactDOM.render(
  <IntlProvider messages={ messages[language] } locale={ language }>
    <App />
  </IntlProvider>,
   document.getElementById('root')
)

serviceWorker.unregister()

export { ServicePanel, BackgroundChooser, MapComponent, MapContainer, Legend }
