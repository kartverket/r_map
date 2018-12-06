function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { NavDropdown } from "react-bootstrap";
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

import OlLayerTile from 'ol/layer/Tile';
import OlLayerImage from 'ol/layer/Image';
import OlMap from 'ol/Map';
import isFunction from 'lodash/isFunction';
import { CapabilitiesUtil } from "../Maplib/CapabilitiesUtil";

import { map, addLayer2 } from "../Maplib/maplibHelper";

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

        _this.addLayers = function (layers) {
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

        _this.onSelectionChange = function (currentNode, selectedNodes) {
            console.log('onChange::', currentNode, selectedNodes);
            if (!map.GetOverlayLayers().includes(currentNode)) {
                map.AddLayer(currentNode);
            }
        };

        _this.onAction = function (_ref) {
            var action = _ref.action,
                node = _ref.node;

            console.log('onAction:: [' + action + ']', node);
        };

        _this.onNodeToggle = function (currentNode) {
            console.log('onNodeToggle::', currentNode);
        };

        _this.state = {};
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
     * The render function.
     */
    AddWmsPanel.prototype.render = function render() {
        var passThroughOpts = _objectWithoutProperties(this.props, []);

        var wmsLayers = this.state.wmsLayers;


        return wmsLayers && wmsLayers.length > 0 ? React.createElement(DropdownTreeSelect, { placeholderText: 'Choose layers', data: wmsLayers, onChange: this.onSelectionChange, onAction: this.onAction, onNodeToggle: this.onNodeToggle }) : null;
    };

    return AddWmsPanel;
}(React.Component);
AddWmsPanel.propTypes = process.env.NODE_ENV !== "production" ? {
    /**
     * @type {Object} -- required
     */
    services: PropTypes.object.isRequired,

    /**
     * Optional instance of Map which is used if onLayerAddToMap is not provided
     * @type {Object}
     */
    map: PropTypes.object,

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
    onSelectionChange: PropTypes.func } : {};