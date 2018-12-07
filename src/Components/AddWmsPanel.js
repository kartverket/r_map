import React from 'react';
import PropTypes from 'prop-types';
import {
    NavDropdown
} from "react-bootstrap";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

import OlLayerTile from 'ol/layer/Tile';
import OlLayerImage from 'ol/layer/Image';
import OlMap from 'ol/Map';
import isFunction from 'lodash/isFunction';
import {
    CapabilitiesUtil
} from "../Maplib/CapabilitiesUtil"

import {
    map,
    addLayer2
  } from "../Maplib/maplibHelper";
  

/**
 * Panel containing a (checkable) list of AddWmsLayerEntry instances.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddWmsPanel
 * @extends React.Component
 */
export class AddWmsPanel extends React.Component {

    /**
     * The prop types.
     * @type {Object}
     */
    static propTypes = {
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
        onSelectionChange: PropTypes.func,

    }

    /**
     * Create an AddWmsPanel.
     * @constructs AddWmsPanel
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.getCapabilitites()
    }

    getCapabilitites() {
        /*
        CapabilitiesUtil.parseWMTS(this.props.services.GetCapabilitiesUrl)
        .then(layers => {
            console.log(layers)
        });
        */
        CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl)
            .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
            .then(layers => {
                this.setState({
                    wmsLayers: layers
                });
            })
            .catch((e) => console.log(e));
    }

    addLayers = (layers)=>{
        let Capability = layers[0]
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
            let ServiceName = 'WMS'
            let newLayerConfig = addLayer2(ServiceName, layerConfig);
            map.AddLayer(newLayerConfig);
        }
    }

    onSelectionChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
        if (!map.GetOverlayLayers().includes(currentNode)) {
             map.AddLayer(currentNode);
         } else {
            if (map.GetVisibleSubLayers().find( el => el.id === currentNode.id )) {
                map.HideLayer(currentNode);
            } else {
                map.ShowLayer(currentNode);
            }
         }
    }
 
    onAction = ({action, node}) => {
        console.log(`onAction:: [${action}]`, node)
    }
    
    onNodeToggle = currentNode => {
        console.log('onNodeToggle::', currentNode)
    }

    /**
     * The render function.
     */
    render() {
        const {
            ...passThroughOpts
        } = this.props;
        const { wmsLayers } = this.state;
        
        return wmsLayers && wmsLayers.length > 0 ?
            <DropdownTreeSelect placeholderText="Choose layers" data={wmsLayers} onChange={this.onSelectionChange} onAction={this.onAction} onNodeToggle={this.onNodeToggle} /> : 
            null;
    }
}

