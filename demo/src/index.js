import React, {Component} from 'react'
import {render} from 'react-dom'

import Map from '../../src'

const TEST_DATA = [
  {
    "Uuid": "8c2c434b-07f7-4ebc-9bc6-9c15cdd75c4c",
    "Title": "Fastmerker & Basestajoner WMS",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.fastmerker2?request=GetCapabilities&service=WMS",
    addLayers:[]
  },
  {
    "Uuid": "8045628b-230a-4ba4-a6e0-xxxxx",
    "Title": "Abas",
    "GetCapabilitiesUrl": "https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS",
    addLayers:[]
  }
]

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      services: TEST_DATA
    };
  }
  
  render() {
    return <div>
      <h1>mapComponent Demo</h1>
      <Map services = { this.state.services } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
