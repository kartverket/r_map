import React from "react";
import PropTypes from "prop-types";
import "react-dropdown-tree-select/dist/styles.css";

import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";

import { map, addLayer } from "../../MapUtil/maplibHelper";
import "./AddWmsPanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Legend from "../Legend/Legend";

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
    this.state = {
      expanded: false,
      checkedWmslayers: {}
    };
    this.toggleWmslayer = this.toggleWmslayer.bind(this);
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
  };

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

  onAction = ({ action, node }) => {
    console.log(`onAction:: [${action}]`, node);
  };

  onNodeToggle = currentNode => {
    console.log("onNodeToggle::", currentNode);
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
  toggleWmslayer(event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.setState({
        checkedWmslayers: {
          ...this.state.checkedWmslayers,
          [event.target.id]: true
        }
      });
    } else {
      this.setState({
        checkedWmslayers: {
          ...this.state.checkedWmslayers,
          [event.target.id]: undefined
        }
      });
    }
  }

  isWmsLayerChecked(layerid) {
    return this.state.checkedWmslayers[layerid];
  }

  renderSelectedLayers() {
    const { wmsLayers } = this.state;
    if (wmsLayers && wmsLayers.length) {
      const wmsLayersList = wmsLayers.map(layer => {
        console.log(layer)
        return (
          <div className="facet" key={layer.id}>
            <input
              className="checkbox"
              onChange={this.toggleWmslayer}
              id={layer.id}
              type="checkbox"
            />
            <label
              onClick={() => this.onSelectionChange(layer)}
              htmlFor={layer.id}
            >
              <FontAwesomeIcon
                className="svg-checkbox"
                icon={
                  this.isWmsLayerChecked(layer.id)
                    ? ["far", "check-square"]
                    : ["far", "square"]
                }
              />
              <span>{layer.label}</span>
            </label>{" "}

            {/* ToDo[1] Legend: add proper styling to legend (sizing, hide(?) by default ) */}
            {/* ToDo[2] Legend: Move legend to a more appropriate(?) place/component(?) */}
            <Legend legendUrl={layer.subLayers[0].legendGraphicUrl} />

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
        <div
          onClick={() => this.toggleExpand()}
          className={"expand-layers-btn"}
        >
          {this.props.services.Title}{" "}
          <FontAwesomeIcon
            icon={
              this.state.expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]
            }
          />
        </div>
        {this.renderRemoveButton()}

        <div
          className={
            this.state.expanded ? "selectedlayers open" : "selectedlayers"
          }
        >
          {this.renderSelectedLayers()}
        </div>
      </div>
    );
  }
}
