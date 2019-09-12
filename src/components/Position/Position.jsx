import React, { useState, useEffect } from "react";
import './Position.scss';
import {
  get as getProjection,
  getTransform
} from 'ol/proj.js';
import { applyTransform } from 'ol/extent.js';
import { createStringXY, format } from 'ol/coordinate.js';
import OlView from 'ol/View';
import OlMousePositionControl from 'ol/control/MousePosition';
import ProjectionUtil from '../../MapUtil/ProjectionUtil';

const Position = props => {
  const [projection, setProjectionString] = useState();

  useEffect(() => {
    createOlMousePositionControl(window.olMap)
  }, [window.olMap])

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

  /**
   * Handler to set projection of map - called if coordinate system in
   * CoordinateReferenceSystemCombo was changed
   *
   * @param {Object} crsObj The object returned by CoordinateReferenceSystemCombo
   *
   */
  const setProjection = (crsObj) => {
    const {
      map,
      mapScales
    } = this.props;
    const currentProjection = map.getView().getProjection();
    const newProj = getProjection(`EPSG:${crsObj.code}`);
    const fromToTransform = getTransform(currentProjection, newProj);
    const currentExtent = map.getView().calculateExtent(map.getSize());

    var transformedExtent = applyTransform(currentExtent, fromToTransform);
    const resolutions = mapScales.map((scale) =>
      ProjectionUtil.getResolutionForScale(scale, newProj.getUnits()))
      .reverse();
    var newView = new OlView({
      projection: newProj,
      resolutions: resolutions,
    });
    map.setView(newView);
    newView.fit(transformedExtent);

    const mousePositionControl = map.getControls().getArray().find((c) => c instanceof OlMousePositionControl);

    if (mousePositionControl) {
      const isWgs84 = map.getView().getProjection().getCode() === "EPSG:4326";
      const wgs84Format = (coordinate) => coordinate.map((coord) => ProjectionUtil.toDms(coord));
      mousePositionControl.setProjection(newProj);
      mousePositionControl.setCoordinateFormat(isWgs84 ? wgs84Format : createStringXY(2));
    }
  }

  return (
    <div className="mouseposition">
      <span>{(projection)}</span>
      <div id="mouse-position" />
    </div>
  );
}

export default Position;
