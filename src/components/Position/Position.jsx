import React, { useState, useEffect } from "react"
import style from './Position.module.scss'
import { format } from 'ol/coordinate.js'
import OlMousePositionControl from 'ol/control/MousePosition'

const Position = () => {
  const [projection, setProjectionString] = useState()

  useEffect(() => {
    createOlMousePositionControl(window.olMap)
  })

  /**
   * Creates and adds the mouse position control to the map.
   *
   * @param {OlMap} The OpenLayers map
   */
  const createOlMousePositionControl = (map) => {
    const existingControls = map.getControls()
    const mousePositionControl = existingControls.getArray().find((c) => c instanceof OlMousePositionControl)
    setProjectionString(map.getView().getProjection().getCode())

    const customFormat = (coordinate) => format(coordinate, '{y}N, {x}Ø')

    if (!mousePositionControl) {
      const options = {
        name: 'ol-mouse-position',
        coordinateFormat: customFormat,
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;',
        projection: projection
      }
      const mousePositionControl = new OlMousePositionControl(options)
      map.addControl(mousePositionControl)
    }
  }

  return (
    <div className={ style.mouseposition }>
      <span>{ (projection) }</span>
      <div id="mouse-position" />
    </div>
  )
}

export default Position
