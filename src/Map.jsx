import React, { Component } from 'react';
import {map, mapConfig} from './mapHelper'

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {init: false};
  }

  componentDidMount() {
    map.Init('map', mapConfig) 
    map.AddZoom()
    map.AddScaleLine()
    this.setState({init: true});
  }

  render() {
    return (
      <div>
        <div id="map">
        </div>
      </div>
    );
  }
}

export default Map;
