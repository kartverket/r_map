import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './LayerEntry.scss'
import { map } from "../../MapUtil/maplibHelper";

const LayerEntry = props => {
  const [options, toggleOptions] = useState(false);
  const [checked, setChecked] = useState(props.layer.isVisible);
  const [transparency, setTransparency] = useState(50);
  //const [index, setIndex] = useState(0);

  const layer = props.layer;
  const copyright = layer.copyright;
  const abstractTextSpan = () => {
    return layer.abstract ? (
      <span>{`${layer.label} - ${layer.abstract}:`}</span>
    ) : (
      <span>{`${layer.label}`}</span>
    );
  };

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
    setChecked(currentNode.isVisible);
  };

  const setOpacity = value => {
    setTransparency(value);
    map.SetLayerOpacity(layer, transparency / 100);
  };

  /**
   *

  const setLayerIndex = newIndex => {
    setIndex(newIndex);
    map.SetZIndex(layer.subLayers[0], newIndex);
  };
   */
  /**
   *
   */
  const checkResolution = () => {
    const resolution = window.olMap.getView().getResolution();
    if (layer.subLayers[0].maxScale <= resolution) {
      console.warn("Resolution mismatch, layer " + layer.name + " doesn't show at this zoom level ");
    }
  }
  window.olMap.getView().on('change:resolution', function(e) {
    checkResolution()
  });

  return (
    <>
      <input className="checkbox" id={layer.id} type="checkbox" />
      <label onClick={() => onSelectionChange(layer)} htmlFor={layer.id}>
        <FontAwesomeIcon
          className="svg-checkbox"
          icon={checked ? ["far", "check-square"] : ["far", "square"]}
        />
      </label>{" "}
      {abstractTextSpan()}
      {copyright ? (
        <FontAwesomeIcon className="infoIcon" icon={["info"]} />
      ) : null}
      <label onClick={() => toggleOptions(!options)}>
        <FontAwesomeIcon
          icon={["far", "sliders-h"]}
          color={options ? "red" : "black"}
        />
      </label>
      {options ? (
        <div className={style.settings}>
          {/** Tar ut prio buttone for nå *
          <div>
            <button className={style.movelayerBtn} onClick={() => setLayerIndex(index + 1)}>Flytt fremover<FontAwesomeIcon title="Vis laget over"  icon={['fas', 'arrow-up']} /></button>
            <button className={style.movelayerBtn} onClick={() => setLayerIndex(index - 1)}>Flytt bakover <FontAwesomeIcon  title="Vis laget under" icon={['fas','arrow-down']} /></button>
            <span className={style.priority}>Prioritet: {index}</span>
          </div>
           */}
          {/** TODO: STYLE the slider */}
          <label className={style.slider}>
            Gjennomsiktighet:
            <input
              type="range"
              min={0}
              max={100}
              value={transparency}
              onChange={e => setOpacity(e.target.value)}
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

LayerEntry.propTypes = {
  layer: PropTypes.object
};

export default LayerEntry;
