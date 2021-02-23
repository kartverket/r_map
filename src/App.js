import React from 'react'
import MapContainer from './components/MapContainer/MapContainer'

const TEST_DATA = [
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
  /*
 {
  'Title': 'Marine WMS',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://marine.discomap.eea.europa.eu/arcgis/services/Marine/EEA_coastline_v2017/MapServer/WMSServer?request=GetCapabilities&service=WMS',
  addLayers: []
  },
  */
   {
    'Title': 'Romvær',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'http://rin-te0031/cgi-bin/romvaer?request=GetCapabilities&service=WMS',
    // 'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wmstest.romvaer?request=GetCapabilities&service=WMS',
    'addLayers': ['romvaer_band2']
},
 {
  'Uuid': '8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c',
  'Title': 'Fastmerker & Basestajoner WMS',
  'DistributionProtocol': 'OGC:WMS',
  'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS',
  addLayers: [],
  excludeLayers: ['Niv_fastmerker', 'Landsnettpunkt','Stamnettpunkt','Trekantpunkt']
},
/*
  {
    'Title': 'Abas',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://openwms.statkart.no/skwms1/wms.adm_enheter2?request=GetCapabilities&service=WMS',
    addLayers: []
  },
  */
  /*
  {
    'Title': 'Not working',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://wms.geonorge.no/skwms1/wms.georef3?version=1.1.0&request=GetCapabilities&service=wms',
    'customParams':
    {
'SLD_BODY': `<?xml version="1.0" encoding="utf-16"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
<NamedLayer>
<Name>fkb_ABCD</Name>
<UserStyle>
<FeatureTypeStyle>
<Rule>
<Name>FKB-A</Name>
<ogc:Filter>
<ogc:PropertyIsEqualTo>
<ogc:PropertyName>fkbstandar</ogc:PropertyName>
<ogc:Literal>A</ogc:Literal>
</ogc:PropertyIsEqualTo>
</ogc:Filter>
<PolygonSymbolizer>
<Fill>
<CssParameter name="fill">#fe96fe</CssParameter>
<CssParameter name="fill-opacity">0.2</CssParameter>
</Fill>
<Stroke>
<CssParameter name="stroke">#010101</CssParameter>
<CssParameter name="stroke-width">0.2</CssParameter>
</Stroke>
</PolygonSymbolizer>
</Rule>
<Rule>
<Name>FKB-B</Name>
<ogc:Filter>
<ogc:PropertyIsEqualTo>
<ogc:PropertyName>fkbstandar</ogc:PropertyName>
<ogc:Literal>B</ogc:Literal>
</ogc:PropertyIsEqualTo>
</ogc:Filter>
<PolygonSymbolizer>
<Fill>
<CssParameter name="fill">#01fe01</CssParameter>
<CssParameter name="fill-opacity">0.2</CssParameter>
</Fill>
<Stroke>
<CssParameter name="stroke">#010101</CssParameter>
<CssParameter name="stroke-width">0.2</CssParameter>
</Stroke>
</PolygonSymbolizer>
</Rule>
<Rule>
<Name>FKB-C</Name>
<ogc:Filter>
<ogc:PropertyIsEqualTo>
<ogc:PropertyName>fkbstandar</ogc:PropertyName>
<ogc:Literal>C</ogc:Literal>
</ogc:PropertyIsEqualTo>
</ogc:Filter>
<PolygonSymbolizer>
<Fill>
<CssParameter name="fill">#c8e07b</CssParameter>
<CssParameter name="fill-opacity">0.2</CssParameter>
</Fill>
<Stroke>
<CssParameter name="stroke">#010101</CssParameter>
<CssParameter name="stroke-width">0.2</CssParameter>
</Stroke>
</PolygonSymbolizer>
</Rule>
<Rule>
<Name>FKB-D</Name>
<ogc:Filter>
<ogc:PropertyIsEqualTo>
<ogc:PropertyName>fkbstandar</ogc:PropertyName>
<ogc:Literal>D</ogc:Literal>
</ogc:PropertyIsEqualTo>
</ogc:Filter>
<PolygonSymbolizer>
<Fill>
<CssParameter name="fill">#feb049</CssParameter>
<CssParameter name="fill-opacity">0.2</CssParameter>
</Fill>
<Stroke>
<CssParameter name="stroke">#010101</CssParameter>
<CssParameter name="stroke-width">0.2</CssParameter>
</Stroke>
</PolygonSymbolizer>
</Rule>
</FeatureTypeStyle>
</UserStyle>
</NamedLayer>
</StyledLayerDescriptor>`,
    },
    'addLayers': ['Georef-ABCD']
  },
   */
  /*
  {
    'Title': 'opencache',
    'DistributionProtocol': 'OGC:WMS',
    'GetCapabilitiesUrl': 'https://wms.geonorge.no/skwms1/wms.gebco_skyggerelieff2?request=GetCapabilities&service=WMS',
    'addLayers': ['nasjonale_grenser', 'kystlinje']
  }
  */
  /* {
    'Title': 'Eox',
    'DistributionProtocol': 'OGC:WMTS',
    'GetCapabilitiesUrl': 'https://f.tiles.maps.eox.at/wmts/1.1.0?version=1.1.0&service=wmts&request=getcapabilities',
    addLayers: []
  } */
  //https://f.tiles.maps.eox.at/wmts/1.0.0?
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
]

const App = () => {
  return (
    <div className="App">
      <MapContainer services={ TEST_DATA } />
    </div>
  )
}

export default App

