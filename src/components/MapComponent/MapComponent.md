This example shows the usage of the MapComponent

```jsx
const TEST_DATA = [
  {
    "Title": "Abas",
    "DistributionProtocol": "OGC:WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS",
    'addLayers': ['Administrative_enheter_2018']
  }
];

<MapComponent services={TEST_DATA}/>
```
