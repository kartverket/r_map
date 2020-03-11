```js
const TEST_DATA = {
    "Title": "Fastmerker & Basestajoner WMS",
    "DistributionProtocol": "OGC:WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS",
    addLayers:['Niv_fastmerker','Landsnettpunkt']
};

<ServicePanel services={TEST_DATA} />
```
