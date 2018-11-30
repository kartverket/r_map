import React, {Component} from 'react'
import {render} from 'react-dom'

import Map from '../../src'

const EXAMPEL_WMS =
  "https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS";

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = { wms: EXAMPEL_WMS };
  }
  
  render() {
    return <div>
      <h1>mapComponent Demo</h1>
      <Map wms={this.state.wms}/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
