"use strict";

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _MapContainer = _interopRequireDefault(require("./components/MapContainer/MapContainer"));

var TEST_DATA = [
/*
   {
    'Title': 'kv_adminomr_kommune',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.gp_dek_oversikt?datasett=kv_adminomr_kommune&service=WMS&request=GetCapabilities',
    'customParams': {
      datasett: 'kv_adminomr_kommune'
    },
    addLayers: ['gp_dek_oversikt_wms', 'datasett_dekning']
  },
 */

/*
   {
   'Uuid': '8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c',
   'Title': 'Fastmerker & Basestajoner WMS',
   'DistributionProtocol': 'OGC:WMS',
   'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS',
   addLayers: ['Niv_fastmerker', 'Landsnettpunkt']
 },
*/
{
  'Title': 'Abas',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.adm_enheter2?request=GetCapabilities&service=WMS',
  addLayers: ['fylker_gjel', 'kommuner_gjel']
}
/*
  {
    'Title': 'Dybdedata_dekning_dtm50_5',
    'DistributionProtocol': 'GEOJSON',
    'ShowPropertyName': 'n',
    'url': 'https://norgeskart.no/json/dekning/sjo/celler/dtm50_5.geojson',
    addLayers: ['dcells_05m']
  },
 */

/*
 {
    'Title': 'Ruter_entinelSkyfritt2018Uint16',
    'DistributionProtocol': 'GEOJSON',
    'ShowPropertyName': 'n',
    'url': 'https://norgeskart.no/json/tema/Ruter_entinelSkyfritt2018Uint16.geojson',
    addLayers: ['Ruteinndeling_SatellittdataSentinelSkyfritt2018Uint16']
  }
 */

/*
 {
   'Title': 'ssr2',
   'DistributionProtocol': 'OGC:WMS',
   'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.ssr2?request=GetCapabilities&service=WMS'
 },
 {
   'Uuid': '8045628b-230a-4ba4-a6e0-xxxxx',
   'Title': 'fisk',
   'DistributionProtocol': 'OGC:WMS',
   'GetCapabilitiesUrl': 'https://wms.geonorge.no/skwms1/wms.nib-prosjekter?request=GetCapabilities&service=WMS',
   addLayers: []
 },
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

var App = function App() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_MapContainer.default, {
    services: TEST_DATA
  }));
};

var _default = App;
exports.default = _default;