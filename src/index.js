import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './Utils/icons';

import AddServicePanel from './components/AddServicePanel/AddServicePanel';
import BackgroundChooser from './components/BackgroundChooser/BackgroundChooser';
import MapComponent from './components/MapComponent/MapComponent';
import MapContainer from './components/MapContainer/MapContainer';
import Legend from './components/Legend/Legend';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

export { AddServicePanel, BackgroundChooser, MapComponent, MapContainer, Legend };
