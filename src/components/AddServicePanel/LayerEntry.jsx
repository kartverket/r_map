import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { map } from "../../MapUtil/maplibHelper";

const LayerEntry = props => {
  const [options, toggleOptions] = useState(false);
  const [checked, setChecked] = useState(props.layer.isVisible);
  const [transparency, setTransparency] = useState(50);

  const layer = props.layer;
  const copyright = layer.copyright;
  const abstractTextSpan = () => {
    return layer.abstract ? (
      <span>{`${layer.label} - ${layer.abstract}:`}</span>
    ) : (
      <span>{`${layer.label}`}</span>
    );
  }

  const onSelectionChange = currentNode => {
    if (!map.GetOverlayLayers().includes(currentNode)) {
      map.AddLayer(currentNode);
    } else {
      if (map.GetVisibleSubLayers().find(el => el.id === currentNode.id)) {
        map.HideLayer(currentNode);
      } else {
        map.ShowLayer(currentNode);
      }
    }
    setChecked(currentNode.isVisible)
  };

  const setOpacity = (value) => {
    setTransparency(value)
    map.SetLayerOpacity(layer,transparency/100)
  }

  return (
      <>
        <input
          className="checkbox"
          id={layer.id}
          type="checkbox"
        />
        <label onClick={() => onSelectionChange(layer)} htmlFor={layer.id} >
        <FontAwesomeIcon className="svg-checkbox" icon={checked ? ["far", "check-square"] : ["far", "square"] } />
        </label>{" "}

        {abstractTextSpan()}
        {copyright ? (
          <FontAwesomeIcon className="infoIcon" icon={["info"]} />
        ) : null}
        <label onClick={() => toggleOptions(!options)}>
          <FontAwesomeIcon icon={["far", "cogs"]} color={options ? "red" : "black"} />
        </label>
        {options ? (
          <div>
          {/** TODO: Add layer up and down */}
          {/** TODO: STYLE the slider */}
            <label>transparency: {transparency}
            <input
              type="range"
              min={0}
              max={100}
              value={transparency}
              onChange={(e) => setOpacity(e.target.value)}
            />
            </label>
          </div>
        ) : (
          ""
        )}
        {props.children}
      </>
  );
};

export default LayerEntry;
