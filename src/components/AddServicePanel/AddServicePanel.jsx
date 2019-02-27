import React from "react";
import PropTypes from "prop-types";

import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";
import { map } from "../../MapUtil/maplibHelper";

import "./AddServicePanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InlineLegend from "../Legend/InlineLegend";
import LayerEntry from "./LayerEntry";

/**
 * Panel containing a (checkable) list.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddServicePanel
 * @extends React.Component
 */
export default class AddServicePanel extends React.Component {
  /**
   * The prop types.
   * @type {Object}
   */
  static propTypes = {
    /**
     * The services to be parsed and shown in the panel
     * @type {Object} -- required
     */
    services: PropTypes.object.isRequired,

    /**
     * Optional instance of Map
     * @type {Object}
     */
    map: PropTypes.object
  };

  /**
   * Create an AddWmsPanel.
   * @constructs AddWmsPanel
   */
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.getCapabilitites();
  }

  getCapabilitites() {
    switch (this.props.services.DistributionProtocol) {
      case "WMS":
      case "OGC:WMS":
        CapabilitiesUtil.parseWmsCapabilities(
          this.props.services.GetCapabilitiesUrl
        )
          .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
          .then(layers => {
            if (this.props.services.addLayers.length > 0) {
              let layersToBeAdded = layers.filter(e =>
                this.props.services.addLayers.includes(e.name)
              );
              layersToBeAdded.forEach(layer => map.AddLayer(layer));
            }
            this.setState({
              wmsLayers: layers
            });
          })
          .catch(e => console.log(e));
        break;
      case "WFS":
        CapabilitiesUtil.parseWFSCapabilities(
          this.props.services.GetCapabilitiesUrl
        )
          .then(CapabilitiesUtil.getLayersFromWfsCapabilties)
          .then(layers => {
            this.setState({
              wmsLayers: layers
            });
          })
          .catch(e => console.log(e));
        break;
      default:
        console.warn("No service type specified");
        break;
    }
  }

  onSelectionChange = currentNode => {
    if (!map.GetOverlayLayers().includes(currentNode)) {
      map.AddLayer(currentNode);
    } else {
      if (map.GetVisibleSubLayers().find(el => el.id === currentNode.id)) {
        map.HideLayer(currentNode);
      } else {
        map.ShowLayer(currentNode);
      }
    }
  };

  toggleExpand() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
  renderRemoveButton() {
    if (this.props.removeMapItem) {
      return (
        <FontAwesomeIcon
          className="remove-inline"
          onClick={this.props.removeMapItem}
          icon={["fas", "times"]}
        />
      );
    } else {
      return "";
    }
  }

  renderSelectedLayers() {
    const { wmsLayers } = this.state;
    if (wmsLayers && wmsLayers.length) {
      const wmsLayersList = wmsLayers.map(layer => {
        return (
          <div className="facet" key={layer.id}>
            <LayerEntry layer={layer} />
            <InlineLegend legendUrl={layer.subLayers[0].legendGraphicUrl} />
          </div>
        );
      });
      return wmsLayersList;
    } else {
      return "";
    }
  }

  /**
   * The render function.
   */
  render() {
    return (
      <div>
        <div onClick={() => this.toggleExpand()} className={"expand-layers-btn"} >
          <span className={"ellipsis-toggle"}>{this.props.services.Title}</span>
          <FontAwesomeIcon
            icon={
              this.state.expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]
            }
          />
        </div>
        {this.renderRemoveButton()}

        <div className={
            this.state.expanded ? "selectedlayers open" : "selectedlayers"
          }
        >
          {this.renderSelectedLayers()}
        </div>
      </div>
    );
  }
}
