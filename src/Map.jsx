import React, { Component } from 'react';
import { map, olMap, mapConfig } from "./maplibHelper";

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {init: false};
  }

  componentDidMount() {
    map.Init('map', mapConfig) 
    map.AddZoom()
    map.AddScaleLine()
    console.log(olMap);

    this.setState({init: true});
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: '800px'}} >
        </div>
      </div>
    );
  }
}

export default Map;
