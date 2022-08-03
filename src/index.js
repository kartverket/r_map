import React from 'react'
import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

serviceWorker.unregister()

export { ServicePanel, BackgroundChooser, MapComponent, MapContainer, Legend }
