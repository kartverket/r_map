import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Panel } from "react-bootstrap";

import OlLayerTile from 'ol/layer/Tile';
import OlLayerImage from 'ol/layer/Image';
import OlMap from 'ol/Map';

import {
    CapabilitiesUtil
} from "@terrestris/ol-util";

import {
    map,
    addLayer2
  } from "../Maplib/maplibHelper";
  
import isFunction from 'lodash/isFunction';

import {AddWmsLayerEntry} from './AddWmsLayerEntry';

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
        titleText: PropTypes.string
    }

    /**
     * Create an AddWmsPanel.
     * @constructs AddWmsPanel
     */
    constructor(props) {
        super(props);
        this.state = {
            selectedWmsLayers: []
        };
        this.getCapabilitites()
    }

    getCapabilitites() {
        CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl)
            .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
            .then(layers => {
                this.setState({
                    wmsLayers: layers
                });
            })
            .catch(() => alert("Could not parse capabilities document."));
    }
    /**
     * onSelectedLayersChange - set state for selectedWmsLayers
     *
     * @param {Array} selectedWmsLayers titles of selected WMS layers to set
     * in state
     */
    onSelectedLayersChange = (selectedWmsLayers) => {
        const {
            onSelectionChange
        } = this.props;

        if (isFunction(onSelectionChange)) {
            onSelectionChange(selectedWmsLayers);
        }
        if (selectedWmsLayers.target.value) {
            this.setState({
              selectedWmsLayers: [
                ...this.state.selectedWmsLayers,
                    selectedWmsLayers.target.value
              ]
            });
        }
    }

    addLayers = (layers)=>{
        console.log(layers)
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
    /**
     * onAddSelectedLayers - function called if button with key useSelectedBtn is
     * clicked filters wmsLayers given in props by those in selectedWmsLayers of
     * state
     */
    onAddSelectedLayers = (selectedWmsLayers) => {
        const {
            onLayerAddToMap,
            map
        } = this.props;

        let layerName = selectedWmsLayers.target.value
        console.log(this.state)
        console.log(layerName)

        const filteredLayers = this.state.wmsLayers.filter(
            layer => layerName == layer.get('title')
        );

        if (onLayerAddToMap) {
            onLayerAddToMap(filteredLayers);
        } else if (map) {
            filteredLayers.forEach(layer => {
                // Add layer to map if it is not added yet
                if (!map.getLayers().getArray().includes(layer)) {
                    map.addLayer(layer);
                }
            });
        } else {
            console.warn('Neither map nor onLayerAddToMap given in props. Will do nothing.');
        }
    }


    /**
     * The render function.
     */
    render() {
        const {
            titleText,
            addSelectedLayersText,
            ...passThroughOpts
        } = this.props;

        const {
            wmsLayers,
            selectedWmsLayers
        } = this.state;
        return wmsLayers && wmsLayers.length > 0 ? <Panel title={titleText} bounds="#main" className="add-wms-panel" {...passThroughOpts}>
            <div onClick = { this.onAddSelectedLayers } >
              {wmsLayers.map((layer, idx) => (
                <AddWmsLayerEntry wmsLayer={layer} key={idx} />
              ))}
            </div>
          </Panel> : null;
    }
}

