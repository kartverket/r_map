import React from 'react'
import MapContainer from './components/MapContainer/MapContainer'

const TEST_DATA = [
  /*
  {
    'uuid': '30369f29-e21a-464f-97f7-a202ca7c97e7',
    'Title': 'Met',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://fastapi.s-enda.k8s.met.no/api/get_quicklook/2024/07/30/metopc-avhrr-20240730140530-20240730141232.nc?request=GetCapabilities&service=WMS&version=1.3.0',
    'addLayers': []
  },
  {
    'uuid': '30369f29-e21a-464f-97f7-a202ca7c97e7_',
    'Title': 'Met',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://fastapi.s-enda.k8s.met.no/api/get_quicklook/2024/07/29/metopc-avhrr-20240729173948-20240729175123.nc?request=GetCapabilities&service=WMS&version=1.3.0',
    'addLayers': []
  }
  */
  /*
  {
    'Uuid': '30369f29-e21a-464f-97f7-a202ca7c97e7',
    'Title': 'Kulturminner WMS',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://kart.ra.no/wms/kulturminner?REQUEST=GetCapabilities&SERVICE=WMS&VERSION=1.3.0',
    addLayers: []
  },
  */
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
  {
    'Uuid': '666e4559-60bf-4a1d-9e72-c43502a9a58b',
    'Title': 'Abas',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.adm_enheter2?request=GetCapabilities&service=WMS',
    addLayers: ['fylker_gjel', 'kommuner_gjel']
  }
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
]

const App = () => {
  return (
    <div className="App">
      <MapContainer services={ TEST_DATA } />
    </div>
  )
}

export default App

