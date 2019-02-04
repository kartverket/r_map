'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Map = exports.BackgroundChooser = exports.AddWmsPanel = undefined;

var _AddWmsPanel = require('./components/AddWmsPanel/AddWmsPanel');

var _AddWmsPanel2 = _interopRequireDefault(_AddWmsPanel);

var _BackgroundChooser = require('./components/BackgroundChooser/BackgroundChooser');

var _BackgroundChooser2 = _interopRequireDefault(_BackgroundChooser);

var _MapComponent = require('./components/MapComponent/MapComponent');

var _MapComponent2 = _interopRequireDefault(_MapComponent);

var _webfontloader = require('webfontloader');

var _webfontloader2 = _interopRequireDefault(_webfontloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_webfontloader2.default.load({
    google: {
        families: ['Titillium web:300,400,700', 'sans-serif']
    }
});

exports.AddWmsPanel = _AddWmsPanel2.default;
exports.BackgroundChooser = _BackgroundChooser2.default;
exports.Map = _MapComponent2.default;