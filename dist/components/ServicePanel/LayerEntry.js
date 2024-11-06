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
var _queryString = _interopRequireDefault(require("query-string"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//import { Messaging } from '../../Utils/communication'

const LayerEntry = props => {
  const featureState = (0, _react.useContext)(_store.store);
  const {
    dispatch
  } = featureState;
  const [options, toggleOptions] = (0, _react.useState)(false);
  const [olLayer, setLayer] = (0, _react.useState)();
  const [checked, setChecked] = (0, _react.useState)(props.layer.isVisible);
  const [transparency, setTransparency] = (0, _react.useState)(50);
  const layer = props.layer;
  layer.Name = layer.name && typeof layer.name === 'object' ? layer.name.localPart : layer.Name;
  const abstractTextSpan = () => {
    let textSpan = '';
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
  const onSelectionChange = currentNode => {
    let isNewLayer = true;
    if (layer.Name) {
      let currentLayer;
      if (props.meta.Type === 'OGC:WMS' || props.meta.Type === 'WMS' || props.meta.Type === 'WMS-tjeneste') {
        currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromWmsCapabilities(props.meta, currentNode);
      } else if (props.meta.Type === 'GEOJSON') {
        currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromGeoJson(props.meta, currentNode);
      } else if (props.meta.Type === 'OGC:WFS' || props.meta.Type === 'WFS' || props.meta.Type === 'WFS-tjeneste') {
        currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromWFS(props.meta, currentNode);
      }
      setLayer(currentLayer);
      window.olMap.getLayers().forEach(function (maplayer) {
        if (maplayer.get('name') === (currentNode.Name + '_' + props.meta.uuid || currentNode.Title + '_' + props.meta.uuid)) {
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
            const viewResolution = window.olMap.getView().getResolution();
            const formats = currentLayer.getProperties().getFeatureInfoFormats;
            let indexFormat = 0;
            if (formats.indexOf('application/vnd.ogc.gml') > 0) {
              indexFormat = formats.indexOf('application/vnd.ogc.gml');
            } else if (formats.indexOf('text/xml') > 0) {
              indexFormat = formats.indexOf('text/xml');
            } else if (formats.indexOf('text/plain') > 0) {
              indexFormat = formats.indexOf('text/plain');
            } else if (formats.indexOf('application/json') > 0) {
              indexFormat = formats.indexOf('application/json');
            } else if (formats.indexOf('text/html') === 0) {
              indexFormat = 1;
            }
            const url = currentLayer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, window.olMap.getView().getProjection(), {
              INFO_FORMAT: formats[indexFormat]
            });
            if (url && currentLayer.getVisible()) {
              fetch(url).then(response => response.text()).then(data => dispatch({
                type: 'SET_FEATURES',
                show: true,
                info: (0, _FeatureUtil.parseFeatureInfo)(data, formats[indexFormat])
              })).catch(error => {
                console.error('Error:', error);
              });
            }
          });
        } else {
          // Assume if not queryable then it could be geojson features
          window.olMap.on('click', function (evt) {
            const features = window.olMap.getFeaturesAtPixel(evt.pixel, (feature, layer) => feature);
            if (features) {
              features.forEach(feature => {
                const coord = feature.getGeometry().getCoordinates();
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
                let content = feature.get(props.meta.ShowPropertyName);
                let message = {
                  cmd: 'featureSelected',
                  featureId: feature.getId(),
                  properties: content,
                  coordinates: coord
                };
                //dispatch(setFeature(message))
              });
            }
          });
        }
      }
    }
  };
  const setOpacity = value => {
    setTransparency(value);
    if (olLayer) {
      olLayer.setOpacity(Math.min(transparency / 100, 1));
    }
  };
  const checkResolution = () => {
    const resolution = window.olMap.getView().getResolution();
    if (layer.MaxScaleDenominator <= resolution) {
      console.warn("Resolution mismatch, layer " + layer.Name + " doesn't show at this zoom level ");
    }
  };
  window.olMap.getView().on('change:resolution', function (e) {
    checkResolution();
  });
  const legendHandling = layer => {
    const legends = [];
    const Layerstyle = layer.Style;
    const layerName = layer.Name;
    Layerstyle.forEach(style => {
      if (style.Name.includes('inspire_common:DEFAULT') || style.Name.includes('DEFAULT')) {
        const parsedUrl = _queryString.default.parseUrl(style.LegendURL[0].OnlineResource);
        if (parsedUrl.query['layer'] === layerName) {
          legends.push(style.LegendURL[0].OnlineResource);
        }
      }
    });
    if (legends.length === 0) {
      Layerstyle.forEach(style => {
        if (style.LegendURL && style.LegendURL.length > 0) {
          legends.push(style.LegendURL[0].OnlineResource);
        }
      });
    }
    return legends;
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, layer.Name ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("input", {
    className: "checkbox",
    id: layer.Name,
    type: "checkbox"
  }), /*#__PURE__*/_react.default.createElement("label", {
    onClick: () => onSelectionChange(layer),
    htmlFor: layer.Title
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "svg-checkbox",
    icon: checked ? ["far", "check-square"] : ["far", "square"]
  }))) : /*#__PURE__*/_react.default.createElement("label", {
    onClick: () => onSelectionChange(layer),
    htmlFor: layer.Title
  }, " "), abstractTextSpan(), layer.Name ? /*#__PURE__*/_react.default.createElement("label", {
    onClick: () => toggleOptions(!options)
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ["fas", "sliders-h"],
    color: options ? "red" : "black"
  })) : '', layer.Style ? legendHandling(layer).map((legend, index) => {
    return /*#__PURE__*/_react.default.createElement(_InlineLegend.default, {
      key: index,
      legendUrl: legend
    });
  }) : '', options ? /*#__PURE__*/_react.default.createElement("div", {
    className: _LayerEntryModule.default.settings
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: _LayerEntryModule.default.slider
  }, "Gjennomsiktighet:", /*#__PURE__*/_react.default.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: transparency,
    onChange: e => setOpacity(e.target.value)
  }))) : "", props.children, layer.Layer ? layer.Layer.map((subLayer, isub) => /*#__PURE__*/_react.default.createElement("div", {
    className: _LayerEntryModule.default.facetSub,
    key: isub
  }, /*#__PURE__*/_react.default.createElement(LayerEntry, {
    layer: subLayer,
    meta: props.meta,
    key: isub
  }))) : '');
};
LayerEntry.propTypes = {
  layer: _propTypes.default.object,
  meta: _propTypes.default.object
};
var _default = LayerEntry;
exports.default = _default;