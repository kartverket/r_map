import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './LayerEntry.scss'
import InlineLegend from '../Legend/InlineLegend';
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";


const LayerEntry = props => {
  const [options, toggleOptions] = useState(false)
  const [olLayer, setLayer] = useState()
  const [checked, setChecked] = useState(props.layer.isVisible)
  const [transparency, setTransparency] = useState(50)

  const layer = props.layer
  const info = '' // layer.Abstract  //Prepare for some info text, for example the Abstract info or more.

  const abstractTextSpan = () => {
    let textSpan = ''
    if (layer.Name && layer.Name.length > 0) {
      textSpan = layer.Name
    }
    if (layer.Title && (layer.Title.length > 0) && layer.Title !== layer.Name) {
      textSpan = layer.Title
    }
    if (layer.Abstract && layer.Abstract.length > 0 && layer.Abstract !== layer.Title && layer.Abstract !== layer.Name && textSpan.length === 0) {
      textSpan = textSpan.length === 0 ? (layer.Abstract) : (textSpan + ' - ' + layer.Abstract)
    }
    return (<span>{textSpan}</span>)
  }

  const onSelectionChange = currentNode => {
    let isNewLayer = true
    if (layer.Name) {
      const currentLayer = CapabilitiesUtil.getOlLayerFromWmsCapabilities(props.meta, currentNode);
      setLayer(currentLayer)

      window.olMap.getLayers().forEach(function (maplayer) {
        if (maplayer.get('name') === (currentNode.Name || currentNode.Title)) {
          isNewLayer = false
          maplayer.getVisible() ? maplayer.setVisible(false) : maplayer.setVisible(true)
          setChecked(maplayer.getVisible())
        }
      })
      if (isNewLayer) {
        window.olMap.addLayer(currentLayer)
        setChecked(currentLayer.getVisible())
      }
    }
  }

  const setOpacity = value => {
    setTransparency(value)
    if (olLayer) {
      olLayer.setOpacity(Math.min(transparency / 100, 1));
    }
  }

  const checkResolution = () => {
    const resolution = window.olMap.getView().getResolution()
    if (layer.MaxScaleDenominator <= resolution) {
      console.warn("Resolution mismatch, layer " + layer.Name + " doesn't show at this zoom level ")
    }
  }

  window.olMap.getView().on('change:resolution', function (e) {
    checkResolution()
  })

  return (
    <>
      {layer.Name ? (
        <>
          <input className="checkbox" id={layer.Name} type="checkbox" />
          <label onClick={() => onSelectionChange(layer)} htmlFor={layer.Title}>
            <FontAwesomeIcon className="svg-checkbox" icon={checked ? ["far", "check-square"] : ["far", "square"]} />
          </label>
        </>
      ) : (
          <label onClick={() => onSelectionChange(layer)} htmlFor={layer.Title}> </label>
        )}
      {" "}
      {abstractTextSpan()}
      {info ? (
        <div class="info">
          <FontAwesomeIcon className="infoIcon" icon={["far", "info"]} />
          <span class="infoText">{info}</span>
        </div>
      ) : null}
      <label onClick={() => toggleOptions(!options)}>
        <FontAwesomeIcon icon={["far", "sliders-h"]} color={options ? "red" : "black"} />
      </label>
      <InlineLegend legendUrl={((layer.Style && layer.Style[0].LegendURL) ? layer.Style[0].LegendURL[0].OnlineResource : '')} />
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
  layer: PropTypes.object,
  meta: PropTypes.object
};

export default LayerEntry;
