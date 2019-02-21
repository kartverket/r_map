import React, { useState } from "react";
import { map, eventHandler } from "../../MapUtil/maplibHelper";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "./BackgroundChooser.scss";
/**
 * Panel containing a list of backgroundLayers.
 */
const BackgroundChooser = () => {
  const [baseLayers, setBaseLayers] = useState([]);
  const [baseLayer, setBaseLayer] = useState([]);

  eventHandler.RegisterEvent("MapLoaded", () => setBaseLayers(map.GetBaseLayers()) );

  const setAsBaseLayer = baseLayer => {
    map.SetBaseLayer(baseLayer);
    map.ZoomToLayer(baseLayer);
    setBaseLayer(baseLayer);
  };

  const renderBaseLayers = baseLayers => {
    return baseLayers.map((baseLayer, index) => (
      <ToggleButton key={index} className={"icon_" + baseLayer.id} value={baseLayer}>
        <span> {baseLayer.name} </span>
      </ToggleButton>
    ));
  };
  return (
    <ToggleButtonGroup
      type="radio"
      name="Backgound"
      className="backgroundChooser"
      onChange={setAsBaseLayer}
      value={baseLayer}
    >
      {renderBaseLayers(baseLayers)}
    </ToggleButtonGroup>
  );
};
export default BackgroundChooser;
