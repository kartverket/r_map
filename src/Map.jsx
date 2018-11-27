import React, { Component } from "react";
import { map, eventHandler, mapConfig, addLayer2 } from "./maplibHelper";
import { mergeDefaultParams, parseWmsCapabilities } from "./Utils/MapHelper";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";
import "ol/ol.css";
import Layerswitch from "./Layerswitch";
import AddWmsPanel from "./components/AddWmsPanel";
import { CapabilitiesUtil } from "@terrestris/ol-util";
import { Button } from 'react-bootstrap';

const WMS_CAPABILITIES_URL =
  "https://openwms.statkart.no/skwms1/wms.adm_enheter?request=GetCapabilities&service=WMS";

class Map extends Component {
  // submenu keys of first level
  rootSubmenuKeys = ["sub1", "sub2"];

  state = {
    collapsed: true,
    layers: [],
  };
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
    this.olMap = null
  }

  componentDidMount() {
    if (this.wms) {
      this.addWMS(this.wms, this.layers);
    }
    this.olMap = map.Init("map", this.newMapConfig);
    map.AddZoom();
    map.AddScaleLine();
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
    this.props = { map: map};
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
  onClick() {
    CapabilitiesUtil.parseWmsCapabilities(WMS_CAPABILITIES_URL)
      .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
      .then(layers => {
        console.log(layers)
        this.setState({
          layers: layers
        });
      })
      .catch(() => alert("Could not parse capabilities document."));
  }

  render() {
    const { layers } = this.state;

    return <div style={{ width: 256 }}>
        {/* Menu for later
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
        </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={this.state.collapsed}
      >
          <SubMenu key="sub1" title={<span>
                <Icon type="appstore" />
                <span>Navigation One</span>
              </span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span>
                <Icon type="setting" />
                <span>Navigation Three</span>
              </span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
          </SubMenu>
        </Menu>
        */}
        <Layerswitch map={map} />
        <div id="map" style={{ height: "800px", width: "800px" }} />
        <Button onClick={this.onClick.bind(this)}>
          Fetch capabilities of const
        </Button>
        <AddWmsPanel style={{ position: "relative", height: "500px" }} key="1" 
          map={this.olMap} wmsLayers={layers} draggable={true} width={500} height={400} x={0} y={100} />
      </div>;
  }
}

export default Map;
