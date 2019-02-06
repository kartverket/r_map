import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './Utils/icons';

import AddWmsPanel from './components/AddWmsPanel/AddWmsPanel';
import BackgroundChooser from './components/BackgroundChooser/BackgroundChooser';
import MapComponent from './components/MapComponent/MapComponent';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

export { AddWmsPanel, BackgroundChooser, MapComponent };