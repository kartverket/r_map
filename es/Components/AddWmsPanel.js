var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Panel } from "react-bootstrap";

import OlLayerTile from 'ol/layer/Tile';
import OlLayerImage from 'ol/layer/Image';
import OlMap from 'ol/Map';

import { CapabilitiesUtil } from "../Maplib/CapabilitiesUtil";

import { map, addLayer2 } from "../Maplib/maplibHelper";

import isFunction from 'lodash/isFunction';

import { AddWmsLayerEntry } from './AddWmsLayerEntry';

/**
 * Panel containing a (checkable) list of AddWmsLayerEntry instances.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddWmsPanel
 * @extends React.Component
 */
export var AddWmsPanel = function (_React$Component) {
    _inherits(AddWmsPanel, _React$Component);

    /**
     * Create an AddWmsPanel.
     * @constructs AddWmsPanel
     */
    function AddWmsPanel(props) {
        _classCallCheck(this, AddWmsPanel);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.onSelectedLayersChange = function (selectedWmsLayers) {
            var onSelectionChange = _this.props.onSelectionChange;


            if (isFunction(onSelectionChange)) {
                onSelectionChange(selectedWmsLayers);
            }
            if (selectedWmsLayers.target.value) {
                _this.setState({
                    selectedWmsLayers: [].concat(_this.state.selectedWmsLayers, [selectedWmsLayers.target.value])
                });
            }
        };

        _this.addLayers = function (layers) {
            console.log(layers);
            var Capability = layers[0];
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
                var ServiceName = 'WMS';
                var newLayerConfig = addLayer2(ServiceName, layerConfig);
                map.AddLayer(newLayerConfig);
            }
        };

        _this.onAddSelectedLayers = function (selectedWmsLayers) {
            var _this$props = _this.props,
                onLayerAddToMap = _this$props.onLayerAddToMap,
                map = _this$props.map;


            var layerName = selectedWmsLayers.target.value;
            console.log(_this.state);
            console.log(layerName);

            var filteredLayers = _this.state.wmsLayers.filter(function (layer) {
                return layerName == layer.name;
            });

            if (onLayerAddToMap) {
                onLayerAddToMap(filteredLayers);
            } else if (map) {
                filteredLayers.forEach(function (layer) {
                    // Add layer to map if it is not added yet
                    if (!map.GetOverlayLayers().includes(layer)) {
                        map.AddLayer(layer);
                    }
                });
            } else {
                console.warn('Neither map nor onLayerAddToMap given in props. Will do nothing.');
            }
        };

        _this.state = {
            selectedWmsLayers: []
        };
        _this.getCapabilitites();
        return _this;
    }

    /**
     * The prop types.
     * @type {Object}
     */


    AddWmsPanel.prototype.getCapabilitites = function getCapabilitites() {
        var _this2 = this;

        /*
        CapabilitiesUtil.parseWMTS(this.props.services.GetCapabilitiesUrl)
        .then(layers => {
            console.log(layers)
        });
        */
        CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl).then(CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
            _this2.setState({
                wmsLayers: layers
            });
        }).catch(function (e) {
            return console.log(e);
        });
    };
    /**
     * onSelectedLayersChange - set state for selectedWmsLayers
     *
     * @param {Array} selectedWmsLayers titles of selected WMS layers to set
     * in state
     */

    /**
     * onAddSelectedLayers - function called if button with key useSelectedBtn is
     * clicked filters wmsLayers given in props by those in selectedWmsLayers of
     * state
     */


    /**
     * The render function.
     */
    AddWmsPanel.prototype.render = function render() {
        var _props = this.props,
            titleText = _props.titleText,
            addSelectedLayersText = _props.addSelectedLayersText,
            passThroughOpts = _objectWithoutProperties(_props, ['titleText', 'addSelectedLayersText']);

        var _state = this.state,
            wmsLayers = _state.wmsLayers,
            selectedWmsLayers = _state.selectedWmsLayers;

        return wmsLayers && wmsLayers.length > 0 ? React.createElement(
            Panel,
            _extends({ title: titleText, bounds: '#main', className: 'add-wms-panel' }, passThroughOpts),
            React.createElement(
                'div',
                { onClick: this.onAddSelectedLayers },
                wmsLayers.map(function (layer, idx) {
                    return React.createElement(AddWmsLayerEntry, { wmsLayer: layer, key: idx });
                })
            )
        ) : null;
    };

    return AddWmsPanel;
}(React.Component);
AddWmsPanel.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * @type {Object} -- required
     */
    services: PropTypes.object.isRequired,

    /**
     * Optional instance of OlMap which is used if onLayerAddToMap is not provided
     * @type {OlMap}
     */
    map: PropTypes.instanceOf(OlMap),

    /**
     * Optional function being called when onAddSelectedLayers 
     * is triggered
     * @type {Function}
     */
    onLayerAddToMap: PropTypes.func,

    /**
     * Optional function that is called if selection has changed.
     * @type {Function}
     */
    onSelectionChange: PropTypes.func,

    /**
     * Optional text to be shown in button to add selected layers
     * @type {String}
     */
    addSelectedLayersText: PropTypes.string,

    /**
     * Optional text to be shown in panel title
     * @type {String}
     */
    titleText: PropTypes.string } : {};