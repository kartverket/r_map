import React from "react";
import { map, eventHandler, mapConfig } from "../../MapUtil/maplibHelper";
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";
import BackgroundChooser from "../BackgroundChooser/BackgroundChooser";
import AddServicePanel from "../AddServicePanel/AddServicePanel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./MapContainer.scss";

const ListItem = props => (
  <AddServicePanel services={props.listItem} removeMapItem={props.removeMapItem} draggable/>
);

/**
 * @class The Map Component
 * @extends React.Component
 */
export default class MapContainer extends React.Component {
  state = {
    layers: []
  };
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
     * @type {Function}
     */
    onChangeLon: PropTypes.func,
    /**
     * @type {Function}
     */
    onChangeLat: PropTypes.func,
    /**
     * @type {Function}
     */
    onChangeZoom: PropTypes.func,
    /**
     * @type {Function}
     */
    onMapViewChanges: PropTypes.func,
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
    menu: PropTypes.bool
  };

  static defaultProps = {
    onMapViewChanges: () => {},
    onChangeLon: () => {},
    onChangeLat: () => {},
    onChangeZoom: () => {},
    lon: 396722,
    lat: 7197860,
    zoom: 4,
    wms: "",
    menu: true
  };

  /**
   *
   *@constructs Map
   */
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      activeKey: "1",
      open: false,
      menu: this.props.menu
    };

    const queryValues = queryString.parse(window.location.search);

    let lon = Number(queryValues["lon"] || props.lon);
    let lat = Number(queryValues["lat"] || props.lat);
    let zoom = Number(queryValues["zoom"] || props.zoom);

    this.wms = queryValues["wms"] || "";
    this.layers = Array(queryValues["layers"] || []);
    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    let projectName = queryValues['project'] || 'norgeskart'
    let epsg = queryValues['epsg'] || 'EPSG:3857'
*/
    //  this.props = { lon: lon, lat: lat, zoom: zoom };
    let defaultConfig = JSON.parse(JSON.stringify(mapConfig))
    this.newMapConfig = Object.assign({}, defaultConfig, {
      center: [lon, lat],
      zoom: zoom
    });
  }

  /**
   *
   */
  componentDidMount() {
    if (this.props.wms) {
      this.addWMS(this.wms, this.layers);
    }
    window.olMap = map.Init("map", this.newMapConfig);
    map.AddZoom();
    map.AddScaleLine();
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
    this.props = { map: map };
  }

  /**
   *
   */
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
    CapabilitiesUtil.parseWmsCapabilities(
      this.props.services.GetCapabilitiesUrl
    )
      .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
      .then(layers => {
        this.setState({
          wmsLayers: layers
        });
      })
      .catch(() => alert("Could not parse capabilities document."));
  }

  renderServiceList() {
    return this.props.services.map((listItem, i) => (
      <ListItem listItem={listItem} removeMapItem={ this.props.removeMapItem ? this.props.removeMapItem : null } key={i} map={map}/>
    ));
  }
  renderLayerButton() {
    return this.props.services && this.props.services.length > 0;
  }
  handleSelect(activeKey) {
    this.setState({
      activeKey
    });
  }

  toogleLayers() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
  toogleMap() {
    console.log("lukke kartet");
    window.history.back();
    // TODO: get paramtere to check for url til goto for closing map
  }

  /**
   *
   */
  render() {
    return (
      <div className={style.mapContainer}>
        <BackgroundChooser />
        <div>
          {this.renderLayerButton() ? (
            <div className={ this.state.isExpanded ? style.container + " closed" : style.container + " open" }>
              <FontAwesomeIcon onClick={() => this.toogleLayers()} className={style.toggleBtn} icon={this.state.isExpanded ? ["far", "layer-group"] : "times"}/>
              <div>{this.renderServiceList()}</div>
            </div>
          ) : (
            <div>Gå til kartkatalogen</div>
          )}

          <div className={style.closeMap}>
            <FontAwesomeIcon title="Lukk kartet" onClick={() => this.toogleMap()} className={style.toggleBtn} icon={"times"} />
            <span className={style.closeButtonLabel}>Lukk kartet</span>
          </div>
        </div>
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
