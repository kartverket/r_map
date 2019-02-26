import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";

import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";
import { map } from "../../MapUtil/maplibHelper";

import "./AddServicePanel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InlineLegend from "../Legend/InlineLegend";
import LayerEntry from "./LayerEntry"

/**
 * Panel containing a (checkable) list.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddServicePanel
 * @extends React.Component
 */
const AddServicePanel = (props) => {
  const [wmsLayers, setWmsLayers] = useState({state:[]})
  const [expanded, toggleExpand] = useState(false);
  const handleExpand = () => toggleExpand(!expanded);

  const getWmsLayers = () => wmsLayers.state
  const setLayers = v => {
    wmsLayers.state = v;
    setWmsLayers(wmsLayers)
  }

  const getCapabilitites = () => {
    switch (props.services.DistributionProtocol) {
      case "WMS":
      case "OGC:WMS":
        CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl)
          .then(CapabilitiesUtil.getLayersFromWmsCapabilties)
          .then(layers => {
            if (props.services.addLayers.length > 0) {
              let layersToBeAdded = layers.filter(e =>
                props.services.addLayers.includes(e.name)
              );
              layersToBeAdded.forEach(layer => {
                map.AddLayer(layer)
              });
              setLayers(layers)
            }
          })
          .catch(e => console.log(e));
        break;
      case "WFS":
        CapabilitiesUtil.parseWFSCapabilities(props.services.GetCapabilitiesUrl)
          .then(CapabilitiesUtil.getLayersFromWfsCapabilties)
          .then(layers => {
            setLayers(layers)
          })
          .catch(e => console.log(e));
        break;
      default:
        console.warn("No service type specified");
        break;
    }
  }

  const renderRemoveButton = () => props.removeMapItem ? <FontAwesomeIcon className="remove-inline" onClick={props.removeMapItem} icon={["fas", "times"]} /> : ''

  const renderSelectedLayers = () => {
    let layers = getWmsLayers()
    if (layers && layers.length) {
      return layers.map(layer => {
        return (
          <div key={layer.id}>
            <LayerEntry layer={layer}/>
            <InlineLegend legendUrl={layer.subLayers[0].legendGraphicUrl} />
          </div>
        );
      });
    } else {
      return "";
    }
  }

  getCapabilitites()

  return (
    <>
      <div onClick={() => handleExpand()} className={"expand-layers-btn"}>
        <span className={"ellipsis-toggle"}>{props.services.Title}</span>
        <FontAwesomeIcon icon={ expanded ? ["fas", "angle-up"] : ["fas", "angle-down"] } />
      </div>
      {renderRemoveButton()}

      <div className={ expanded ? "selectedlayers open" : "selectedlayers" } >
        {renderSelectedLayers()}
      </div>
    </>
  );
}

AddServicePanel.propTypes = {
  /**
   * The services to be parsed and shown in the panel
   * @type {Object} -- required
   */
  services: PropTypes.object.isRequired,

  /**
   * Optional instance of Map
   * @type {Object}
   */
  map: PropTypes.object,

  /**
   * Optional function that is called if selection has changed.
   * @type {Function}
   */
  onSelectionChange: PropTypes.func
};
export default AddServicePanel
