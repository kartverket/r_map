"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _LayerEntryModule = _interopRequireDefault(require("./LayerEntry.module.scss"));

var _InlineLegend = _interopRequireDefault(require("../Legend/InlineLegend"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _style = require("ol/style");

var _store = require("../../Utils/store.js");

var _FeatureUtil = require("../../MapUtil/FeatureUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LayerEntry = function LayerEntry(props) {
  var featureState = (0, _react.useContext)(_store.store);
  var dispatch = featureState.dispatch;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      toggleOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      olLayer = _useState4[0],
      setLayer = _useState4[1];

  var _useState5 = (0, _react.useState)(props.layer.isVisible),
      _useState6 = _slicedToArray(_useState5, 2),
      checked = _useState6[0],
      setChecked = _useState6[1];

  var _useState7 = (0, _react.useState)(50),
      _useState8 = _slicedToArray(_useState7, 2),
      transparency = _useState8[0],
      setTransparency = _useState8[1];

  var layer = props.layer;
  layer.Name = layer.name && _typeof(layer.name) === 'object' ? layer.name.localPart : layer.Name;

  var abstractTextSpan = function abstractTextSpan() {
    var textSpan = '';

    if (layer.Name && layer.Name.length > 0) {
      textSpan = layer.Name;
    }

    if (layer.Title && layer.Title.length > 0 && layer.Title !== layer.Name) {
      textSpan = layer.Title;
    }

    if (layer.Abstract && layer.Abstract.length > 0 && layer.Abstract !== layer.Title && layer.Abstract !== layer.Name && textSpan.length === 0) {
      textSpan = textSpan.length === 0 ? layer.Abstract : textSpan + ' - ' + layer.Abstract;
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: _LayerEntryModule.default.spanCheckbox
    }, textSpan), /*#__PURE__*/_react.default.createElement("p", {
      hidden: true
    }, layer.Layer ? 'Group layer' : 'layer', " "));
  };

  var onSelectionChange = function onSelectionChange(currentNode) {
    var isNewLayer = true;

    if (layer.Name) {
      var currentLayer;

      if (props.meta.Type === 'OGC:WMS' || props.meta.Type === 'WMS' || props.meta.Type === 'WMS-tjeneste') {
        currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromWmsCapabilities(props.meta, currentNode);
      } else if (props.meta.Type === 'GEOJSON') {
        currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromGeoJson(props.meta, currentNode);
      } else if (props.meta.Type === 'OGC:WFS' || props.meta.Type === 'WFS' || props.meta.Type === 'WFS-tjeneste') {
        currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromWFS(props.meta, currentNode);
      }

      setLayer(currentLayer);
      window.olMap.getLayers().forEach(function (maplayer) {
        if (maplayer.get('name') === (currentNode.Name || currentNode.Title)) {
          isNewLayer = false;
          maplayer.getVisible() ? maplayer.setVisible(false) : maplayer.setVisible(true);
          setChecked(maplayer.getVisible());
        }
      });

      if (isNewLayer) {
        window.olMap.addLayer(currentLayer);
        setChecked(currentLayer.getVisible());

        if (currentNode.queryable) {
          window.olMap.on('singleclick', function (evt) {
            var viewResolution = window.olMap.getView().getResolution();
            var formats = currentLayer.getProperties().getFeatureInfoFormats;
            var indexFormat = 0;

            if (formats.indexOf('text/plain') > 0) {
              indexFormat = formats.indexOf('text/plain');
            } else if (formats.indexOf('text/xml') > 0) {
              indexFormat = formats.indexOf('text/xml');
            } else if (formats.indexOf('application/vnd.ogc.gml') > 0) {
              indexFormat = formats.indexOf('application/vnd.ogc.gml');
            } else if (formats.indexOf('application/json') > 0) {
              indexFormat = formats.indexOf('application/json');
            } else if (formats.indexOf('text/html') === 0) {
              indexFormat = 1;
            }

            var url = currentLayer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, window.olMap.getView().getProjection(), {
              INFO_FORMAT: formats[indexFormat]
            });

            if (url && currentLayer.getVisible()) {
              fetch(url).then(function (response) {
                return response.text();
              }).then(function (data) {
                return dispatch({
                  type: 'SET_FEATURES',
                  show: true,
                  info: (0, _FeatureUtil.parseFeatureInfo)(data, formats[indexFormat])
                });
              }).catch(function (error) {
                console.error('Error:', error);
              });
            }
          });
        } else {
          // Assume if not queryable then it could be geojson features
          window.olMap.on('click', function (evt) {
            var features = window.olMap.getFeaturesAtPixel(evt.pixel, function (feature, layer) {
              return feature;
            });

            if (features) {
              features.forEach(function (feature) {
                var coord = feature.getGeometry().getCoordinates();
                feature.setStyle(new _style.Style({
                  fill: new _style.Fill({
                    color: 'rgba(255, 255, 255, 0.5)'
                  }),
                  stroke: new _style.Stroke({
                    color: '#310FD3',
                    width: 3
                  }),
                  text: new _style.Text({
                    font: '14px Calibri,sans-serif',
                    fill: new _style.Fill({
                      color: '#000'
                    }),
                    stroke: new _style.Stroke({
                      color: '#fff',
                      width: 5
                    }),
                    text: feature.get(props.meta.ShowPropertyName)
                  })
                }));
                var content = feature.get(props.meta.ShowPropertyName);
                var message = {
                  cmd: 'featureSelected',
                  featureId: feature.getId(),
                  properties: content,
                  coordinates: coord
                }; //dispatch(setFeature(message))
              });
            }
          });
        }
      }
    }
  };

  var setOpacity = function setOpacity(value) {
    setTransparency(value);

    if (olLayer) {
      olLayer.setOpacity(Math.min(transparency / 100, 1));
    }
  };

  var checkResolution = function checkResolution() {
    var resolution = window.olMap.getView().getResolution();

    if (layer.MaxScaleDenominator <= resolution) {
      console.warn("Resolution mismatch, layer " + layer.Name + " doesn't show at this zoom level ");
    }
  };

  window.olMap.getView().on('change:resolution', function (e) {
    checkResolution();
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layer.Name ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("input", {
    className: "checkbox",
    id: layer.Name,
    type: "checkbox"
  }), /*#__PURE__*/_react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.Title
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "svg-checkbox",
    icon: checked ? ["far", "check-square"] : ["far", "square"]
  }))) : /*#__PURE__*/_react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.Title
  }, " "), abstractTextSpan(), layer.Name ? /*#__PURE__*/_react.default.createElement("label", {
    onClick: function onClick() {
      return toggleOptions(!options);
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ["far", "sliders-h"],
    color: options ? "red" : "black"
  })) : '', /*#__PURE__*/_react.default.createElement(_InlineLegend.default, {
    legendUrl: layer.Style && layer.Style[0].LegendURL ? layer.Style[0].LegendURL[0].OnlineResource : ''
  }), options ? /*#__PURE__*/_react.default.createElement("div", {
    className: _LayerEntryModule.default.settings
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: _LayerEntryModule.default.slider
  }, "Gjennomsiktighet:", /*#__PURE__*/_react.default.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: transparency,
    onChange: function onChange(e) {
      return setOpacity(e.target.value);
    }
  }))) : "", props.children, layer.Layer ? layer.Layer.map(function (subLayer, isub) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _LayerEntryModule.default.facetSub,
      key: isub
    }, /*#__PURE__*/_react.default.createElement(LayerEntry, {
      layer: subLayer,
      meta: props.meta,
      key: isub
    }));
  }) : '');
};

LayerEntry.propTypes = {
  layer: _propTypes.default.object,
  meta: _propTypes.default.object
};
var _default = LayerEntry;
exports.default = _default;