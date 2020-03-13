"use strict";

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _LayerEntryModule = _interopRequireDefault(require("./LayerEntry.module.scss"));

var _InlineLegend = _interopRequireDefault(require("../Legend/InlineLegend"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _style = require("ol/style");

var _reactSmee = require("react-smee");

var _FeatureUtil = require("../../MapUtil/FeatureUtil");

//import { Messaging } from '../../Utils/communication'
(0, _reactSmee.createStore)({
  featureInfo: {
    show: false,
    info: []
  }
});

var LayerEntry = function LayerEntry(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      toggleOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      olLayer = _useState4[0],
      setLayer = _useState4[1];

  var _useState5 = (0, _react.useState)(props.layer.isVisible),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      checked = _useState6[0],
      setChecked = _useState6[1];

  var _useState7 = (0, _react.useState)(50),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      transparency = _useState8[0],
      setTransparency = _useState8[1];

  var layer = props.layer;
  layer.Name = layer.name && (0, _typeof2.default)(layer.name) === 'object' ? layer.name.localPart : layer.Name;

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

    return _react.default.createElement("span", {
      className: _LayerEntryModule.default.spanCheckbox
    }, textSpan);
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
                return (0, _reactSmee.setStore)('featureInfo', function () {
                  return data = {
                    show: true,
                    info: (0, _FeatureUtil.parseFeatureInfo)(data, formats[indexFormat])
                  };
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
                };
                console.log(message); //dispatch(setFeature(message))
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
  return _react.default.createElement(_react.default.Fragment, null, layer.Name ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", {
    className: "checkbox",
    id: layer.Name,
    type: "checkbox"
  }), _react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.Title
  }, checked ? _react.default.createElement(_icons.CheckSquareOutlined, null) : _react.default.createElement(_icons.BorderOutlined, null))) : _react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.Title
  }, " "), abstractTextSpan(), layer.Name ? _react.default.createElement("label", {
    onClick: function onClick() {
      return toggleOptions(!options);
    }
  }, options ? _react.default.createElement(_icons.UpOutlined, null) : _react.default.createElement(_icons.DownOutlined, null)) : '', _react.default.createElement(_InlineLegend.default, {
    legendUrl: layer.Style && layer.Style[0].LegendURL ? layer.Style[0].LegendURL[0].OnlineResource : ''
  }), options ? _react.default.createElement("div", {
    className: _LayerEntryModule.default.settings
  }, _react.default.createElement("label", {
    className: _LayerEntryModule.default.slider
  }, "Gjennomsiktighet:", _react.default.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: transparency,
    onChange: function onChange(e) {
      return setOpacity(e.target.value);
    }
  }))) : "", props.children, layer.Layer ? layer.Layer.map(function (subLayer, isub) {
    return _react.default.createElement("div", {
      className: _LayerEntryModule.default.facetSub,
      key: isub
    }, _react.default.createElement(LayerEntry, {
      layer: subLayer,
      meta: props.meta,
      key: isub
    }));
  }) : '');
};

var _default = LayerEntry;
exports.default = _default;