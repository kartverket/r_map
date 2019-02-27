import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './Utils/icons';

import AddServicePanel from './components/AddServicePanel/AddServicePanel';
import BackgroundChooser from './components/BackgroundChooser/BackgroundChooser';
import MapComponent from './components/MapComponent/MapComponent';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

export { AddServicePanel, BackgroundChooser, MapComponent };
