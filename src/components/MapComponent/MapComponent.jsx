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

    crs: PropTypes.string
  };

  static defaultProps = {
    lon: 396722,
    lat: 7197860,
    zoom: 4,
    crs: 'EPSG:25833'
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
*/
    //  this.props = { lon: lon, lat: lat, zoom: zoom };
    mapConfig.coordinate_system = queryValues['crs'] || props.crs
    this.newMapConfig = Object.assign({}, mapConfig, {
      center: [lon, lat],
      zoom: zoom
    });
  }

  componentDidMount() {
    window.olMap = map.Init("map", this.newMapConfig);
    map.AddZoom();
    map.AddScaleLine();
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
    this.setState({ map: map });
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
        .then(capa => {
          let meta = CapabilitiesUtil.getWMSMetaCapabilities(capa)
          meta.Type = 'OGC:WMS'
          meta.Params = service.customParams || ''
          if (service.addLayers.length > 0) {
            let layersToBeAdded = capa.Capability.Layer.Layer.filter(
              e => service.addLayers.includes(e.Name)
            )
            layersToBeAdded.forEach(layer => {
              let laycapaLayerer = CapabilitiesUtil.getOlLayerFromWmsCapabilities(meta, layer)
              window.olMap.addLayer(laycapaLayerer)
            })
          }
        })
        .then(layers => {
          this.setState({
            wmsLayers: layers
          });
        })
        .catch(e => console.warn(e));
    })
  }

  render() {
    return (
      <div className={ style.mapContainer }>
        <div
          id="map"
          style={ {
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 0
          } }
        />
      </div>
    );
  }
}

export default MapComponent;
