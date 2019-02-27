This example shows the usage of the MapContainer

```jsx
const TEST_DATA = [
  {
    "Uuid": "8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c",
    "Title": "Fastmerker & Basestajoner WMS",
    "DistributionProtocol": "OGC:WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS",
    addLayers:[]
  },
  {
    "Uuid": "8045628b-230a-4ba4-a6e0-xxxxx",
    "Title": "Abas",
    "DistributionProtocol": "OGC:WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS",
    addLayers:[]
  },
  {
    "Uuid": "test-07f7-4ebc-9bc6-9c15cdd75c4c",
    "Title": "norgeskart",
    "DistributionProtocol": "OGC:WMTS",
    "GetCapabilitiesUrl": "https://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?request=GetCapabilities&service=WMS",
    addLayers:[]
  }
];
<MapContainer services={TEST_DATA}/>
```
