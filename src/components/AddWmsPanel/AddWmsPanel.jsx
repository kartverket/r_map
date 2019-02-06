import React from "react";
import PropTypes from "prop-types";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";

import { map, addLayer } from "../../MapUtil/maplibHelper";
import "./AddWmsPanel.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Panel containing a (checkable) list.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddWmsPanel
 * @extends React.Component
 */
export default class AddWmsPanel extends React.Component {
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
    onSelectionChange: PropTypes.func
  };

  /**
   * Create an AddWmsPanel.
   * @constructs AddWmsPanel
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.getCapabilitites();
  }

  getCapabilitites() {
    /*
        CapabilitiesUtil.parseWMTS(this.props.services.GetCapabilitiesUrl)
        .then(layers => {
            console.log(layers)
        });
        */
    CapabilitiesUtil.parseWmsCapabilities(
      this.props.services.GetCapabilitiesUrl
    )
      .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
      .then(layers => {
        this.setState({
          wmsLayers: layers
        });
      })
      .catch(e => console.log(e));
  }

  addLayers = layers => {
    let Capability = layers[0];
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
      let ServiceName = "WMS";
      let newLayerConfig = addLayer(ServiceName, layerConfig);
      map.AddLayer(newLayerConfig);
    }
  }

  onSelectionChange = (currentNode, selectedNodes) => {
    if (!map.GetOverlayLayers().includes(currentNode)) {
      map.AddLayer(currentNode);
    } else {
      if (map.GetVisibleSubLayers().find(el => el.id === currentNode.id)) {
        map.HideLayer(currentNode);
      } else {
        map.ShowLayer(currentNode);
      }
    }
  }

  onAction = ({ action, node }) => {
    console.log(`onAction:: [${action}]`, node);
  }

  onNodeToggle = currentNode => {
    console.log("onNodeToggle::", currentNode);
  }

  renderRemoveButton() {
    if (this.props.removeMapItem) {
      return <FontAwesomeIcon className="remove-inline" onClick={this.props.removeMapItem} icon={'times'} />;
    }else {
      return "";
    }
  }

  /**
   * The render function.
   */
  render() {
    const { ...passThroughOpts } = this.props;
    const { wmsLayers } = this.state;

    return wmsLayers && wmsLayers.length > 0 ? (
      <div>
        {this.props.services.Title}
        { this.renderRemoveButton() }
        <DropdownTreeSelect
          placeholderText="Velg kartlag"
          data={wmsLayers}
          onChange={this.onSelectionChange}
          onAction={this.onAction}
          onNodeToggle={this.onNodeToggle}
        />
      </div>
    ) : null;
  }
}
