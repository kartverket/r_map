var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from "react";
import { map, eventHandler, mapConfig, addLayer2 } from "./Maplib/maplibHelper";
import { mergeDefaultParams, parseWmsCapabilities } from "./Utils/MapHelper";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";
import "ol/ol.css";
import { Layerswitch } from "./Components/Layerswitch";
import { AddWmsPanel } from "./Components/AddWmsPanel";
import { CapabilitiesUtil } from "@terrestris/ol-util";
import { Navbar } from "react-bootstrap";

/**
 * @class The Map Component
 * @extends React.Component
 */
var Map = (_temp = _class = function (_React$Component) {
  _inherits(Map, _React$Component);

  /**
   * 
   *@constructs Map
   */
  function Map(props) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var queryValues = queryString.parse(window.location.search);

    var lon = Number(queryValues["lon"] || props.lon);
    var lat = Number(queryValues["lat"] || props.lat);
    var zoom = Number(queryValues["zoom"] || props.zoom);

    _this.wms = queryValues["wms"] || "";
    _this.layers = Array(queryValues["layers"] || []);
    /*
    let wmts = Array(queryValues["wmts"] || []);
    let wfs = Array(queryValues["wfs"] || []);
    let projectName = queryValues["project"] || "norgeskart";
    let epsg = queryValues["epsg"] || "EPSG:3857";
    */
    _this.props = { lon: lon, lat: lat, zoom: zoom };
    _this.newMapConfig = Object.assign({}, mapConfig, {
      center: [_this.props.lon, _this.props.lat],
      zoom: _this.props.zoom
    });
    _this.olMap = null;
    return _this;
  }

  /**
   * 
   */

  /**
   * The prop types.
   * @type {Object}
   */


  Map.prototype.componentDidMount = function componentDidMount() {
    if (this.props.wms) {
      this.addWMS(this.wms, this.layers);
    }
    this.olMap = map.Init("map", this.newMapConfig);
    map.AddZoom();
    map.AddScaleLine();
    eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
    this.props = { map: map };
  };

  /**
   * 
   */


  /**
   * 
   */


  /**
   * 
   */
  Map.prototype.addWMS = function addWMS() {
    var _this2 = this;

    CapabilitiesUtil.parseWmsCapabilities(this.props.wms).then(CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
      _this2.setState({
        layers: layers
      });
    }).catch(function () {
      return alert("Could not parse capabilities document.");
    });
  };
  /**
   * 
   */


  Map.prototype.render = function render() {
    var layers = this.state.layers;

    return React.createElement(
      'div',
      null,
      React.createElement(
        Navbar,
        null,
        React.createElement(Layerswitch, { map: map })
      ),
      React.createElement('div', { id: 'map', style: { height: "500px", width: "700px" } }),
      React.createElement(AddWmsPanel, {
        style: { position: "relative", height: "400px" },
        key: '1',
        map: this.olMap,
        wmsLayers: layers,
        draggable: true,
        width: 500,
        height: 400,
        x: 0,
        y: 100
      })
    );
  };

  return Map;
}(React.Component), _class.defaultProps = {
  onMapViewChanges: function onMapViewChanges() {},
  onChangeLon: function onChangeLon() {},
  onChangeLat: function onChangeLat() {},
  onChangeZoom: function onChangeZoom() {},
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  wms: ''
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    layers: []
  };

  this.addWMS_ = function (url, layers) {
    if (url) {
      var newUrl = mergeDefaultParams(url, {
        service: "WMS",
        request: "GetCapabilities"
      });
      fetch(newUrl).then(function (response) {
        return Promise.resolve(response.text());
      }).then(function (text) {
        var resultText = parseWmsCapabilities(text);

        var _resultText = _extends({}, resultText),
            Service = _resultText.Service,
            Capability = _resultText.Capability;

        if (Capability) {
          var layerConfig = {
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
          var newLayerConfig = addLayer2(Service.Name, layerConfig);
          map.AddLayer(newLayerConfig);
        } else {
          // console.log('No capabilities!')
        }
      });
    } else {
      // console.log("No wms parameter given");
    }
  };

  this.updateMapInfoState = function () {
    var center = map.GetCenter();
    var queryValues = queryString.parse(window.location.search);
    _this3.props = { lon: center.lon, lat: center.lat, zoom: center.zoom };
    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    setQuery(queryValues);
  };
}, _temp);
export { Map as default };
Map.propTypes = process.env.NODE_ENV !== "production" ? {
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
  wms: PropTypes.string
} : {};