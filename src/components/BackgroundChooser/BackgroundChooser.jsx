import React, { useState } from "react"
import { map, eventHandler } from "../../MapUtil/maplibHelper"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import style from "./BackgroundChooser.module.scss"
/**
 * Panel containing a list of backgroundLayers. To be used in MapContainer
 */
const BackgroundChooser = () => {
  const [baseLayers, setBaseLayers] = useState([])
  const [baseLayer, setBaseLayer] = useState([])

  eventHandler.RegisterEvent("MapLoaded", () => setBaseLayers(map.GetBaseLayers()))

  const setAsBaseLayer = baseLayer => {
    map.SetBaseLayer(baseLayer)
    map.ZoomToLayer(baseLayer)
    setBaseLayer(baseLayer)
  }

  const renderBaseLayers = (baseLayers, selectedBaseLayer) => {
    return baseLayers.map((baseLayer, index) => {
      const iconClass = style[`icon_${baseLayer.id}`]
      const activeClass = baseLayer.id === selectedBaseLayer.id ? style.active : ''
      return (
        <ToggleButton key={ index } className={ `${iconClass} ${activeClass}` } value={ baseLayer }>
          <span> { baseLayer.name } </span>
        </ToggleButton>
      )
    })
  }
  return (
    <ToggleButtonGroup
      type="radio"
      name="Backgound"
      className={ style.backgroundChooser }
      onChange={ setAsBaseLayer }
      value={ baseLayer }
    >
      { renderBaseLayers(baseLayers, baseLayer) }
    </ToggleButtonGroup>
  )
}
export default BackgroundChooser
