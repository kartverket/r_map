"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("bootstrap/dist/css/bootstrap.css");

require("bootstrap/dist/css/bootstrap-theme.css");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _MapHelper = require("../../Utils/MapHelper");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

var _setQueryString = require("set-query-string");

var _setQueryString2 = _interopRequireDefault(_setQueryString);

var _BackgroundChooser = require("../BackgroundChooser/BackgroundChooser");

var _BackgroundChooser2 = _interopRequireDefault(_BackgroundChooser);

var _AddWmsPanel = require("../AddWmsPanel/AddWmsPanel");

var _AddWmsPanel2 = _interopRequireDefault(_AddWmsPanel);

var _reactBootstrap = require("react-bootstrap");

require("./MapComponent.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_AddWmsPanel2.default, { key: "1", map: _maplibHelper.map, services: this.props.listItem, draggable: true });
    }
  }]);

  return ListItem;
}(_react2.default.Component);
/**
 * @class The Map Component
 * @extends React.Component
 */


var MapComponent = function (_React$Component2) {
  _inherits(MapComponent, _React$Component2);

  /**
   *
   *@constructs Map
   */

  /**
   * The prop types.
   * @type {Object}
   */
  function MapComponent(props) {
    _classCallCheck(this, MapComponent);

    var _this2 = _possibleConstructorReturn(this, (MapComponent.__proto__ || Object.getPrototypeOf(MapComponent)).call(this, props));

    _initialiseProps.call(_this2);

    _this2.handleSelect = _this2.handleSelect.bind(_this2);

    _this2.state = {
      activeKey: "1",
      open: false,
      menu: _this2.props.menu
    };

    var queryValues = _queryString2.default.parse(window.location.search);

    var lon = Number(queryValues["lon"] || props.lon);
    var lat = Number(queryValues["lat"] || props.lat);
    var zoom = Number(queryValues["zoom"] || props.zoom);

    _this2.wms = queryValues["wms"] || "";
    _this2.layers = Array(queryValues["layers"] || []);
    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    let projectName = queryValues['project'] || 'norgeskart'
    let epsg = queryValues['epsg'] || 'EPSG:3857'
    */
    _this2.props = { lon: lon, lat: lat, zoom: zoom };
    _this2.newMapConfig = Object.assign({}, _maplibHelper.mapConfig, {
      center: [_this2.props.lon, _this2.props.lat],
      zoom: _this2.props.zoom
    });
    _this2.olMap = null;
    return _this2;
  }

  /**
   *
   */


  _createClass(MapComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.wms) {
        this.addWMS(this.wms, this.layers);
      }
      this.olMap = _maplibHelper.map.Init("map", this.newMapConfig);
      _maplibHelper.map.AddZoom();
      _maplibHelper.map.AddScaleLine();
      _maplibHelper.eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
      this.props = { map: _maplibHelper.map };
    }

    /**
     *
     */


    /**
     *
     */

  }, {
    key: "addWMS",
    value: function addWMS() {
      var _this3 = this;

      CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl).then(CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
        _this3.setState({
          wmsLayers: layers
        });
      }).catch(function () {
        return alert("Could not parse capabilities document.");
      });
    }
  }, {
    key: "renderServiceList",
    value: function renderServiceList() {
      return this.props.services.map(function (listItem, i) {
        return _react2.default.createElement(ListItem, { listItem: listItem, key: i, map: _maplibHelper.map });
      });
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(activeKey) {
      this.setState({
        activeKey: activeKey
      });
    }
    /**
     *
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var layers = this.state.layers;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          {
            className: this.state.menu === true ? "pulldown-content" : "hide",
            style: {
              position: "absolute",
              width: "320px",
              zIndex: 600
            }
          },
          _react2.default.createElement(
            _reactBootstrap.Collapse,
            { "in": this.state.open },
            _react2.default.createElement(
              _reactBootstrap.PanelGroup,
              {
                accordion: true,
                id: "accordion-controlled-example",
                activeKey: this.state.activeKey,
                onSelect: this.handleSelect
              },
              _react2.default.createElement(
                _reactBootstrap.Panel,
                { eventKey: "1" },
                _react2.default.createElement(
                  _reactBootstrap.Panel.Heading,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Panel.Title,
                    { toggle: true },
                    "Background Chooser"
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Panel.Body,
                  { collapsible: true },
                  _react2.default.createElement(
                    _reactBootstrap.ButtonGroup,
                    { vertical: true },
                    _react2.default.createElement(_BackgroundChooser2.default, { map: _maplibHelper.map })
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.Panel,
                { eventKey: "2" },
                _react2.default.createElement(
                  _reactBootstrap.Panel.Heading,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Panel.Title,
                    { toggle: true },
                    "Layer Chooser"
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Panel.Body,
                  { collapsible: true },
                  _react2.default.createElement(
                    _reactBootstrap.Nav,
                    { bsStyle: "pills", pullLeft: true },
                    this.renderServiceList()
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            {
              bsStyle: "primary",
              onClick: function onClick() {
                return _this4.setState({ open: !_this4.state.open });
              }
            },
            this.state.open ? "Close Menu" : "Open Menu"
          )
        ),
        _react2.default.createElement("div", {
          id: "map",
          style: {
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 0
          }
        })
      );
    }
  }]);

  return MapComponent;
}(_react2.default.Component);

MapComponent.propTypes = {
  /**
   * @type {Number}
   */
  lon: _propTypes2.default.number,
  /**
   * @type {Number}
   */
  lat: _propTypes2.default.number,
  /**
   * @type {Number}
   */
  zoom: _propTypes2.default.number,
  /**
   * @type {Function}
   */
  onChangeLon: _propTypes2.default.func,
  /**
   * @type {Function}
   */
  onChangeLat: _propTypes2.default.func,
  /**
   * @type {Function}
   */
  onChangeZoom: _propTypes2.default.func,
  /**
   * @type {Function}
   */
  onMapViewChanges: _propTypes2.default.func,
  /**
   * @type {String}
   */
  wms: _propTypes2.default.string,
  /**
   * @type {Array}
   */
  services: _propTypes2.default.arrayOf(_propTypes2.default.object),
  /**
   * @type {Boolean}
   */
  menu: _propTypes2.default.bool
};
MapComponent.defaultProps = {
  onMapViewChanges: function onMapViewChanges() {},
  onChangeLon: function onChangeLon() {},
  onChangeLat: function onChangeLat() {},
  onChangeZoom: function onChangeZoom() {},
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  wms: "",
  menu: true
};

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.state = {
    layers: []
  };

  this.addWMS_ = function (url, layers) {
    if (url) {
      var newUrl = (0, _MapHelper.mergeDefaultParams)(url, {
        service: "WMS",
        request: "GetCapabilities"
      });
      fetch(newUrl).then(function (response) {
        return Promise.resolve(response.text());
      }).then(function (text) {
        var resultText = (0, _MapHelper.parseWmsCapabilities)(text);

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
          var newLayerConfig = (0, _maplibHelper.addLayer)(Service.Name, layerConfig);
          _maplibHelper.map.AddLayer(newLayerConfig);
        } else {
          // console.log('No capabilities!')
        }
      });
    } else {
      // console.log('No wms parameter given')
    }
  };

  this.updateMapInfoState = function () {
    var center = _maplibHelper.map.GetCenter();
    var queryValues = _queryString2.default.parse(window.location.search);
    _this5.props = { lon: center.lon, lat: center.lat, zoom: center.zoom };
    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    (0, _setQueryString2.default)(queryValues);
  };
};

exports.default = MapComponent;