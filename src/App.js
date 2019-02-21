import React, { Component } from 'react';
import MapContainer from './components/MapContainer/MapContainer';

const TEST_DATA = [
  {
    "Uuid": "8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c",
    "Title": "Fastmerker & Basestajoner WMS",
    "DistributionProtocol": "OGC:WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS",
    addLayers:['Niv_fastmerker','Landsnettpunkt']
  },
  {
    "Uuid": "8045628b-230a-4ba4-a6e0-xxxxx",
    "Title": "Abas",
    "DistributionProtocol": "OGC:WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS",
    addLayers:[]
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
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
          <MapContainer services={TEST_DATA} />
      </div>
    );
  }
}

export default App;
