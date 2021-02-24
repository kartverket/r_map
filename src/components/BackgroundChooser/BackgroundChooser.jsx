import React, { useState } from "react"
import { map, eventHandler } from "../../MapUtil/maplibHelper"
import { ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import style from "./BackgroundChooser.module.scss"
import { useIntl } from 'react-intl'

/**
 * Panel containing a list of backgroundLayers. To be used in MapContainer
 */
const BackgroundChooser = () => {
  const [baseLayers, setBaseLayers] = useState([])
  const [baseLayer, setBaseLayer] = useState([])
  const intl = useIntl()

  eventHandler.RegisterEvent("MapLoaded", () => setBaseLayers(map.GetBaseLayers()))

  const setAsBaseLayer = (event, baseLayer) => {
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
          <span> { intl.formatMessage({ id: baseLayer.name}) } </span>
        </ToggleButton>
      )
    })
  }
  return (
    <ToggleButtonGroup
      name="Backgound"
      exclusive
      className={ style.backgroundChooser }
      onChange={ setAsBaseLayer }
      value={ baseLayer }
    >
      { renderBaseLayers(baseLayers, baseLayer) }
    </ToggleButtonGroup>
  )
}
export default BackgroundChooser
