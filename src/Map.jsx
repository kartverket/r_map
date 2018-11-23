import React, { Component } from 'react';
import { map, eventHandler, olMap, mapConfig, addLayer2 } from "./maplibHelper";
import {getWMSCapabilities,mergeDefaultParams, parseWmsCapabilities} from './Utils/MapHelper'
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
    const queryValues = queryString.parse(window.location.search);
    let lon = Number(queryValues["lon"] || 1563279.49);
    let lat = Number(queryValues["lat"] || 9620923.39);
    let zoom = Number(queryValues["zoom"] || 5);
    this.wms = queryValues["wms"] || '';
    let wmts = Array(queryValues["wmts"] || []);
    let wfs = Array(queryValues["wfs"] || []);
    this.layers = Array(queryValues["layers"] || []);
    let projectName = queryValues["project"] || "norgeskart";
    let epsg = queryValues["epsg"] || "EPSG:3857";    
    this.state = {init: false};
  }

  componentDidMount() {
    if(this.wms) {
      this.addWMS(this.wms, this.layers)
    }
    map.Init('map', mapConfig) 
    map.AddZoom()
    map.AddScaleLine()
    eventHandler.RegisterEvent('MapMoveend', this.updateMapInfoState);    

    this.setState({init: true});
  }
  addWMS = (url,layers) => {
    if (url) {
      let newUrl = mergeDefaultParams(url, {
        service: "WMS",
        request: "GetCapabilities"
      });
      fetch(newUrl)
        .then(function (response) {
          return Promise.resolve(response.text());
        })
        .then(function (text) {
          let resultText = parseWmsCapabilities(text);
          let {
            Service,
            Capability
          } = {
            ...resultText
          };
          if (Capability) {
            let layerConfig = {
              type: 'map',
              name: Capability.Layer[0].Abstract,
              url: Capability.Layer[0].url,
              params: {
                layers: layers,
                format: 'image/png'
              },
              guid: '1.temakart',
              options: {
                isbaselayer: 'true',
                singletile: 'false',
                visibility: 'true'
              }
            }
            let test = addLayer2('WMS', layerConfig)
            map.AddLayer(test)
          } else {
            console.log('No capabilities!')
          }          
        });
    } else {
      console.log("No wms parameter given");
    }    
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
