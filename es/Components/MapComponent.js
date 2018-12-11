var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from "react";
import { map, eventHandler, mapConfig, addLayer } from "../MapUtil/maplibHelper";
import { mergeDefaultParams, parseWmsCapabilities } from "../Utils/MapHelper";
import PropTypes from "prop-types";
import queryString from "query-string";
import setQuery from "set-query-string";
import BackgroundChooser from "./BackgroundChooser";
import AddWmsPanel from "./AddWmsPanel";
import { Nav, Panel, PanelGroup, Collapse, Button, ButtonGroup } from "react-bootstrap";

import '../assets/sass/dist.scss';

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ListItem.prototype.render = function render() {
    return React.createElement(AddWmsPanel, {
      key: '1',
      map: map,
      services: this.props.listItem,
      draggable: true
    });
  };

  return ListItem;
}(React.Component);
/**
 * @class The Map Component
 * @extends React.Component
 */


var Map = (_temp = _class = function (_React$Component2) {
  _inherits(Map, _React$Component2);

  /**
   * 
   *@constructs Map
   */
  function Map(props) {
    _classCallCheck(this, Map);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _initialiseProps.call(_this2);

    _this2.handleSelect = _this2.handleSelect.bind(_this2);

    _this2.state = {
      activeKey: "1",
      open: false,
      menu: _this2.props.menu
    };

    var queryValues = queryString.parse(window.location.search);

    var lon = Number(queryValues["lon"] || props.lon);
    var lat = Number(queryValues["lat"] || props.lat);
    var zoom = Number(queryValues["zoom"] || props.zoom);

    _this2.wms = queryValues["wms"] || "";
    _this2.layers = Array(queryValues["layers"] || []);
    /*
    let wmts = Array(queryValues["wmts"] || []);
    let wfs = Array(queryValues["wfs"] || []);
    let projectName = queryValues["project"] || "norgeskart";
    let epsg = queryValues["epsg"] || "EPSG:3857";
    */
    _this2.props = { lon: lon, lat: lat, zoom: zoom };
    _this2.newMapConfig = Object.assign({}, mapConfig, {
      center: [_this2.props.lon, _this2.props.lat],
      zoom: _this2.props.zoom
    });
    _this2.olMap = null;
    return _this2;
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


  Map.prototype.addWMS = function addWMS() {
    var _this3 = this;

    CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl).then(CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
      _this3.setState({
        wmsLayers: layers
      });
    }).catch(function () {
      return alert("Could not parse capabilities document.");
    });
  };

  Map.prototype.renderServiceList = function renderServiceList() {
    return this.props.services.map(function (listItem, i) {
      return React.createElement(ListItem, { listItem: listItem, key: i, map: map });
    });
  };

  Map.prototype.handleSelect = function handleSelect(activeKey) {
    this.setState({
      activeKey: activeKey
    });
  };
  /**
   * 
   */


  Map.prototype.render = function render() {
    var _this4 = this;

    var layers = this.state.layers;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: this.state.menu === true ? 'pulldown-content' : 'hide', style: {
            position: "absolute",
            width: "320px",
            zIndex: 600
          } },
        React.createElement(
          Collapse,
          { 'in': this.state.open },
          React.createElement(
            PanelGroup,
            {
              accordion: true,
              id: 'accordion-controlled-example',
              activeKey: this.state.activeKey,
              onSelect: this.handleSelect
            },
            React.createElement(
              Panel,
              { eventKey: '1' },
              React.createElement(
                Panel.Heading,
                null,
                React.createElement(
                  Panel.Title,
                  { toggle: true },
                  'Background Chooser'
                )
              ),
              React.createElement(
                Panel.Body,
                { collapsible: true },
                React.createElement(
                  ButtonGroup,
                  { vertical: true },
                  React.createElement(BackgroundChooser, { map: map })
                )
              )
            ),
            React.createElement(
              Panel,
              { eventKey: '2' },
              React.createElement(
                Panel.Heading,
                null,
                React.createElement(
                  Panel.Title,
                  { toggle: true },
                  'Layer Chooser'
                )
              ),
              React.createElement(
                Panel.Body,
                { collapsible: true },
                React.createElement(
                  Nav,
                  { bsStyle: 'pills', pullLeft: true },
                  this.renderServiceList()
                )
              )
            )
          )
        ),
        React.createElement(
          Button,
          { bsStyle: 'primary',
            onClick: function onClick() {
              return _this4.setState({ open: !_this4.state.open });
            } },
          this.state.open ? 'Close Menu' : 'Open Menu'
        )
      ),
      React.createElement('div', { id: 'map', style: {
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0
        }
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
  wms: '',
  menu: true
}, _initialiseProps = function _initialiseProps() {
  var _this5 = this;

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
          var newLayerConfig = addLayer(Service.Name, layerConfig);
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
    _this5.props = { lon: center.lon, lat: center.lat, zoom: center.zoom };
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
  wms: PropTypes.string,
  /**
   * @type {Array}
   */
  services: PropTypes.arrayOf(PropTypes.object),
  /**
   * @type {Boolean}
   */
  menu: PropTypes.bool
} : {};