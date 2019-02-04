import AddWmsPanel from './components/AddWmsPanel/AddWmsPanel';
import BackgroundChooser from './components/BackgroundChooser/BackgroundChooser';
import Map from './components/MapComponent/MapComponent';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Titillium web:300,400,700', 'sans-serif']
    }
});

export { AddWmsPanel, BackgroundChooser, Map };
