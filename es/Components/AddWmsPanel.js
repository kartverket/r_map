var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

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
export var AddWmsPanel = (_temp = _class = function (_React$Component) {
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

        _this.onAddSelectedLayers = function () {
            var selectedWmsLayers = _this.state.selectedWmsLayers;
            var _this$props = _this.props,
                onLayerAddToMap = _this$props.onLayerAddToMap,
                map = _this$props.map;


            var filteredLayers = _this.props.wmsLayers.filter(function (layer) {
                return selectedWmsLayers.includes(layer.get('title'));
            });

            if (onLayerAddToMap) {
                onLayerAddToMap(filteredLayers);
            } else if (map) {
                filteredLayers.forEach(function (layer) {
                    // Add layer to map if it is not added yet
                    if (!map.getLayers().getArray().includes(layer)) {
                        map.addLayer(layer);
                    }
                });
            } else {
                console.warn('Neither map nor onLayerAddToMap given in props. Will do nothing.');
            }
        };

        _this.onAddAllLayers = function () {
            var _this$props2 = _this.props,
                onLayerAddToMap = _this$props2.onLayerAddToMap,
                wmsLayers = _this$props2.wmsLayers,
                map = _this$props2.map;


            if (onLayerAddToMap) {
                onLayerAddToMap(wmsLayers);
            } else if (map) {
                wmsLayers.forEach(function (layer) {
                    // Add layer to map if it is not added yet
                    if (!map.getLayers().getArray().includes(layer)) {
                        map.addLayer(layer);
                    }
                });
            } else {
                console.warn('Neither map nor onLayerAddToMap given in props. Will do nothing.');
            }
        };

        _this.state = {
            selectedWmsLayers: []
        };
        return _this;
    }

    /**
     * The defaultProps.
     * @type {Object}
     */


    /**
     * The prop types.
     * @type {Object}
     */


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
     * onAddAllLayers - pass all wmsLayers of props to onLayerAddToMap function
     */


    /**
     * The render function.
     */
    AddWmsPanel.prototype.render = function render() {
        var _props = this.props,
            wmsLayers = _props.wmsLayers,
            titleText = _props.titleText,
            addAllLayersText = _props.addAllLayersText,
            addSelectedLayersText = _props.addSelectedLayersText,
            passThroughOpts = _objectWithoutProperties(_props, ['wmsLayers', 'titleText', 'addAllLayersText', 'addSelectedLayersText']);

        var selectedWmsLayers = this.state.selectedWmsLayers;


        return wmsLayers && wmsLayers.length > 0 ? React.createElement(
            Panel,
            _extends({ title: titleText, bounds: '#main', className: 'add-wms-panel' }, passThroughOpts),
            React.createElement(
                'div',
                { onClick: this.onSelectedLayersChange },
                wmsLayers.map(function (layer, idx) {
                    return React.createElement(AddWmsLayerEntry, { wmsLayer: layer, key: idx });
                })
            ),
            React.createElement(
                ButtonGroup,
                null,
                React.createElement(
                    Button,
                    { size: 'small', key: 'useSelectedBtn', disabled: selectedWmsLayers.length === 0, onClick: this.onAddSelectedLayers },
                    addSelectedLayersText
                ),
                React.createElement(
                    Button,
                    { size: 'small', key: 'useAllBtn', onClick: this.onAddAllLayers },
                    addAllLayersText
                )
            )
        ) : null;
    };

    return AddWmsPanel;
}(React.Component), _class.defaultProps = {
    addAllLayersText: 'Add all layers',
    addSelectedLayersText: 'Add selected layers',
    titleText: 'Add WMS layer' }, _temp);
AddWmsPanel.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * Array containing layers (e.g. `Capability.Layer.Layer` of ol capabilities
     * parser)
     * @type {Array} -- required
     */
    wmsLayers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(OlLayerTile), PropTypes.instanceOf(OlLayerImage)])).isRequired,

    /**
     * Optional instance of OlMap which is used if onLayerAddToMap is not provided
     * @type {OlMap}
     */
    map: PropTypes.instanceOf(OlMap),

    /**
     * Optional function being called when onAddSelectedLayers or onAddAllLayers
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
     * Optional text to be shown in button to add all layers
     * @type {String}
     */
    addAllLayersText: PropTypes.string,

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