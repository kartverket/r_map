import React from "react";
import PropTypes from "prop-types";

import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";
import { map, eventHandler, mapConfig } from "../../MapUtil/maplibHelper";

import queryString from "query-string";
import setQuery from "set-query-string";

import style from "./MapComponent.scss";

/**
 * @class The Map Component
 * @extends React.Component
 */
export class MapComponent extends React.Component {
  /**
   * The prop types.
   * @type {Object}
   */
  static propTypes = {
    /**
     * @type {Number}
     */
    lon: PropTypes.number,
    /**
     * @type {Number}
     */
    lat: PropTypes.number,
    /**
     * @type {Number}
     */
    zoom: PropTypes.number,
    /**
     * @type {Array}
     */
    services: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    lon: 396722,
    lat: 7197860,
    zoom: 4
  };

  /**
   *
   *@constructs Map
   */
  constructor(props) {
    super(props);

    const queryValues = queryString.parse(window.location.search);

    let lon = Number(queryValues["lon"] || props.lon);
    let lat = Number(queryValues["lat"] || props.lat);
    let zoom = Number(queryValues["zoom"] || props.zoom);

    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    let epsg = queryValues['epsg'] || 'EPSG:3857'
*/
    //  this.props = { lon: lon, lat: lat, zoom: zoom };
    mapConfig.coordinate_system = queryValues['epsg'] || 'EPSG:25833'
    this.newMapConfig = Object.assign({}, mapConfig, {
      center: [lon, lat],
      zoom: zoom
    });
    this.olMap = null;
  }

  componentDidMount() {
    this.olMap = map.Init("map", this.newMapConfig);
    map.AddZoom();
    map.AddScaleLine();
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
    this.setState({map: map });
    this.addWMS();
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

  addWMS() {
    this.props.services.forEach(service => {
      CapabilitiesUtil.parseWmsCapabilities(service.GetCapabilitiesUrl)
      .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
      .then(layers => {
        if (service.addLayers.length > 0) {
          let layersToBeAdded = layers.filter(
            e => service.addLayers.includes(e.name)
          )
          layersToBeAdded.forEach(layer => map.AddLayer(layer))
        }
        this.setState({
          wmsLayers: layers
        });
      })
      .catch(e => console.warn(e));
    })
  }

  render() {
    return (
      <div className={style.mapContainer}>
        <div
          id="map"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 0
          }}
        />
      </div>
    );
  }
}

export default MapComponent;
