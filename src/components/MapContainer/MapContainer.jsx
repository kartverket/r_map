import React from "react";
import { map, eventHandler, mapConfig } from "../../MapUtil/maplibHelper";
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";
import BackgroundChooser from "../BackgroundChooser/BackgroundChooser";
import ServicePanel from "../ServicePanel/ServicePanel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./MapContainer.module.scss";
import Position from '../Position/Position'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const ServiceListItem = props => (
  <ServicePanel services={ props.listItem } removeMapItem={ props.removeMapItem } draggable />
)

/**
 * @class The Map Component
 * @extends React.Component
 */
export default class MapContainer extends React.Component {
  state = {
    layers: []
  }
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
     * @type {String}
     */
    wms: PropTypes.string,
    /**
     * @type {Array}
     */
    services: PropTypes.arrayOf(PropTypes.object),
    /**
     * @type {Boolean}
     */
    menu: PropTypes.bool,
    /**
     * @type {String}
     */
    crs: PropTypes.string
  }

  static defaultProps = {
    lon: 396722,
    lat: 7197860,
    zoom: 4,
    wms: "",
    menu: true,
    crs: 'EPSG:25833'
  }

  /**
   *
   *@constructs Map
   */
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      menu: this.props.menu
    }

    const queryValues = queryString.parse(window.location.search)

    let lon = Number(queryValues["lon"] || props.lon)
    let lat = Number(queryValues["lat"] || props.lat)
    let zoom = Number(queryValues["zoom"] || props.zoom)

    this.wms = queryValues["wms"] || ""
    this.layers = Array(queryValues["layers"] || [])
    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    let projectName = queryValues['project'] || 'norgeskart'
    */
    mapConfig.coordinate_system = queryValues['crs'] || props.crs
    let defaultConfig = JSON.parse(JSON.stringify(mapConfig))
    this.newMapConfig = Object.assign({}, defaultConfig, {
      center: [lon, lat],
      zoom: zoom
    })
  }

  /**
   *
   */
  componentDidMount() {
    window.olMap = map.Init("map", this.newMapConfig)
    map.AddZoom()
    map.AddScaleLine()
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState)
    this.props = { map: map }
  }

  /**
   *
   */
  updateMapInfoState = () => {
    let center = map.GetCenter()
    const queryValues = queryString.parse(window.location.search)
    this.props = { lon: center.lon, lat: center.lat, zoom: center.zoom }
    queryValues.lon = center.lon
    queryValues.lat = center.lat
    queryValues.zoom = center.zoom
    setQuery(queryValues)
  }

  renderServiceList() {
    if (this.wms) {
      const addedWms = {
        'Title': 'Added WMS from url',
        'DistributionProtocol': 'OGC:WMS',
        'GetCapabilitiesUrl': this.wms,
        addLayers: []
      }
      this.props.services.push(addedWms)
    }

    return this.props.services.map((listItem, i) => (
      <ServiceListItem listItem={ listItem } removeMapItem={ this.props.removeMapItem ? this.props.removeMapItem : null } key={ i } map={ map } />
    ))
  }
  renderLayerButton() {
    return this.props.services && this.props.services.length > 0
  }

  toogleLayers() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
  toogleMap() {
    window.history.back()
    // TODO: get paramtere to check for url til goto for closing map
  }

  /**
   *
   */
  render() {
    let map = this.props.map
    return (
      <div id="MapContainer" className={ style.mapContainer }>
        <BackgroundChooser />
        <div>
          {this.renderLayerButton() ? (
            <div className={`${style.container} ${this.state.isExpanded ? style.closed : style.open}`}>
              <FontAwesomeIcon onClick={() => this.toogleLayers()} className={style.toggleBtn} icon={this.state.isExpanded ? ["far", "layer-group"] : "times"} />
              <div>{this.renderServiceList()}</div>
            </div>
          ) : (
              <div className={ style.link } onClick={ () => this.toogleMap() }>Gå til kartkatalogen</div>
            ) }

          <div className={ style.closeMap }>
            <FontAwesomeIcon title="Lukk kartet" onClick={ () => this.toogleMap() } className={ style.toggleBtn } icon={ "times" } />
            <span className={ style.closeButtonLabel }>Lukk kartet</span>
          </div>
        </div>
        <div
          id="map"
          style={ {
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 0
          } }
        />
        <Position map={ map } projection={ this.props.crs }></Position>
      </div>
    )
  }
}
