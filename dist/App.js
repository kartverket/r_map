"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MapContainer = _interopRequireDefault(require("./components/MapContainer/MapContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TEST_DATA = [
/*
{
  'Uuid': '8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c',
  'Title': 'Fastmerker & Basestajoner WMS',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS',
  addLayers: ['Niv_fastmerker','Landsnettpunkt']
},*/
{
  'Uuid': '8045628b-230a-4ba4-a6e0-xxxxx',
  'Title': 'Abas',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS',
  addLayers: []
}
/*
{
'Title': 'SFKB-Transakjsoner',
'DistributionProtocol': 'OGC:WMS',
'customParams': {
    TIME: '2019-01-01 00:00:00/2020-01-01 00:00:00'
},
'GetCapabilitiesUrl': 'https://wms.geonorge.no/skwms1/wms.sfkb-transaksjoner?request=GetCapabilities&service=WMS',
'addLayers': ['bygning']
},
{
'Uuid': '8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c',
'Title': 'Kulturminner20180301',
'DistributionProtocol': 'OGC:WMS',
'GetCapabilitiesUrl': ' https://kart.ra.no/arcgis/services/Distribusjon/Kulturminner20180301/MapServer/WMSServer?request=GetCapabilities&service=WMS',
addLayers: []
},
{
'Uuid': '8045628b-230a-4ba4-a6e0-xxxxx',
'Title': 'ssr2',
'DistributionProtocol': 'OGC:WMS',
'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.ssr2?request=GetCapabilities&service=WMS',
addLayers: []
}, {
'Title': 'Dybdedata_dekning_dtm50_5',
'DistributionProtocol': 'GEOJSON',
'url': 'https://norgeskart.no/json/dekning/sjo/celler/dtm50_5.geojson',
addLayers: ['dcells_05m']
},
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
];
/**
 *
 */

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
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

exports.default = App;