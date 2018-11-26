import React, { Component } from "react";
import { map, eventHandler, mapConfig, addLayer2 } from "./maplibHelper";
import {
  mergeDefaultParams,
  parseWmsCapabilities
} from "./Utils/MapHelper";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";
import "ol/ol.css";
import Layerswitch from "./Layerswitch";

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
    lon: 396722,
    lat: 7197860,
    zoom: 4
  };

  constructor(props) {
    super(props);
    const queryValues = queryString.parse(window.location.search);

    let lon = Number(queryValues["lon"] || props.lon);
    let lat = Number(queryValues["lat"] || props.lat);
    let zoom = Number(queryValues["zoom"] || props.zoom);

    this.wms = queryValues["wms"] || "";
    this.layers = Array(queryValues["layers"] || []);
/*
    let wmts = Array(queryValues["wmts"] || []);
    let wfs = Array(queryValues["wfs"] || []);
    let projectName = queryValues["project"] || "norgeskart";
    let epsg = queryValues["epsg"] || "EPSG:3857";
*/
    this.props = { lon: lon, lat: lat, zoom: zoom };
    this.newMapConfig = Object.assign({}, mapConfig, {
      center: [this.props.lon, this.props.lat],
      zoom: this.props.zoom
    });
    this.state = { init: false };
  }

  componentDidMount() {
    if (this.wms) {
      this.addWMS(this.wms, this.layers);
    }
    map.Init("map", this.newMapConfig);
    map.AddZoom();
    map.AddScaleLine();
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);

    this.props = { map: map };
  }

  addWMS = (url, layers) => {
    if (url) {
      let newUrl = mergeDefaultParams(url, {
        service: "WMS",
        request: "GetCapabilities"
      });
      fetch(newUrl)
        .then(function(response) {
          return Promise.resolve(response.text());
        })
        .then(function(text) {
          let resultText = parseWmsCapabilities(text);
          let { Service, Capability } = {
            ...resultText
          };
          if (Capability) {
            let layerConfig = {
              type: "map",
              name: Capability.Layer[0].Abstract,
              url: Capability.Layer[0].url,
              params: {
                layers: layers,
                format: "image/png"
              },
              guid: "1.temakart",
              options: {
                isbaselayer: "true",
                singletile: "false",
                visibility: "true"
              }
            };
            let newLayerConfig = addLayer2(Service.Name, layerConfig);
            map.AddLayer(newLayerConfig);
          } else {
            // console.log('No capabilities!')
          }
        });
    } else {
      // console.log("No wms parameter given");
    }
  };

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
        <div className="menu">
        <div className="menuContent">
        <div className="panel">
              <Layerswitch map={map} />
        </div>

        </div>
        <button className="showHide">Show Hide Menu</button>
         
        </div>
        <div id="map" style={{ height: "800px" }} />
      </div>
    );
  }
}

export default Map;
