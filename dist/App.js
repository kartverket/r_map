"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _MapContainer = _interopRequireDefault(require("./components/MapContainer/MapContainer"));

var TEST_DATA = [{
  'Uuid': '8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c',
  'Title': 'Fastmerker & Basestajoner WMS',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS',
  addLayers: ['Niv_fastmerker', 'Landsnettpunkt']
}, {
  'Uuid': '8045628b-230a-4ba4-a6e0-xxxxx',
  'Title': 'Abas',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS',
  addLayers: []
}, {
  'Uuid': '8045628b-230a-4ba4-a6e0-xxxxx',
  'Title': 'ssr2',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.ssr2?request=GetCapabilities&service=WMS',
  addLayers: []
  /*,
  {
  "Uuid": "test-07f7-4ebc-9bc6-9c15cdd75c",
  "Title": "tilgjengelighet",
  "DistributionProtocol": "WFS",
  "GetCapabilitiesUrl":"http://wfs.geonorge.no/skwms1/wfs.tilgjengelighet_friluft?request=GetCapabilities&service=WFS"
  },
  {
  "Uuid": "test-07f7-4ebc-9bc6-9c15cdd75c",
  "Title": "markagrenser",
  "DistributionProtocol": "WFS",
  "GetCapabilitiesUrl":"https://wfs.geonorge.no/skwms1/wfs.markagrensa?request=GetCapabilities&service=WFS"
  },
  {
  "Uuid": "test-07f7-4ebc-9bc6-9c15cdd75c",
  "Title": "Kvikkleire ",
  "DistributionProtocol": "WFS",
  "GetCapabilitiesUrl":"https://wfs.geonorge.no/skwms1/wfs.kvikkleire?service=wfs&request=getcapabilities"
  },{
  "Uuid": "test-07f7-4ebc-9bc6-9c15cdd75c",
  "Title": "Brannstasjoner ",
  "DistributionProtocol": "WFS",
  "GetCapabilitiesUrl":"https://wfs.geonorge.no/skwms1/wfs.brannstasjoner?service=wfs&request=getcapabilities"
  }*/

}];
/**
 * 
 */

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "App"
      }, _react.default.createElement(_MapContainer.default, {
        services: TEST_DATA
      }));
    }
  }]);
  return App;
}(_react.Component);

var _default = App;
exports.default = _default;