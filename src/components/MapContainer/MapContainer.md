This example shows the usage of the MapContainer

```jsx
const TEST_DATA = [
  {
  'Uuid'd"'8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c'c",
 'Title'le'Fastmerker & Basestajoner WMS'MS",
'DistributionProtocol'co'OGC:WMS'WMS",
'GetCapabilitiesUrl'sU'https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS'=WMS",
    addL ayers:[]
  },
'Uuid'  '8045628b-230a-4ba4-a6e0-xxxxx'e0-xxx'Title'  'Abas'e": "A'DistributionProtocol'on'OGC:WMS': "OGC'GetCapabilitiesUrl'bi'https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS'service=WMS",
     addLayers:[]
'Uuid'
 'test-07f7-4ebc-9bc6-9c15cdd75c4c'c6-9c1'Title'4c'norgeskart'le": "'DistributionProtocol'tr'OGC:WMTS'tocol"'GetCapabilitiesUrl'Ge'https://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?request=GetCapabilities&service=WMS'lities&service=W MS",
    addLayers:[]
  }
];
<MapContainer services={TEST_DATA}/>
```
