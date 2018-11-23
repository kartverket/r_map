import React, { Component } from 'react';
import { map, eventHandler, olMap, mapConfig } from "./maplibHelper";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";

class Map extends Component {
  static propTypes = {
    lon: PropTypes.number,
    lat: PropTypes.number,
    zoom: PropTypes.number,

    onChangeLon: PropTypes.func,
    onChangeLat: PropTypes.func,
    onChangeZoom: PropTypes.func,
    onMapViewChanges: PropTypes.func
  };

  static defaultProps = {
    onMapViewChanges: () => {},
    onChangeLon: () => {},
    onChangeLat: () => {},
    onChangeZoom: () => {},
    lon: 1563279.49,
    lat: 9620923.39,
    zoom: 5
  };
  constructor(props) {
    super(props)
    this.state = {init: false};
  }

  componentDidMount() {
    map.Init('map', mapConfig) 
    map.AddZoom()
    map.AddScaleLine()
    eventHandler.RegisterEvent('MapMoveend', this.updateMapInfoState);
    console.log(map);

    this.setState({init: true});
  }
  updateMapInfoState = () => {
    let center = map.GetCenter();
    const queryValues = queryString.parse(window.location.search);
    this.props = { lon: center.lon, lat: center.lat, zoom: center.zoom };
    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    setQuery(queryValues);
  };

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
