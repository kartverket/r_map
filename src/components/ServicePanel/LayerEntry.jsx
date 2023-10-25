import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from './LayerEntry.module.scss'
import InlineLegend from '../Legend/InlineLegend'
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil"

//import { Messaging } from '../../Utils/communication'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { store } from '../../Utils/store.js'
import { parseFeatureInfo } from '../../MapUtil/FeatureUtil'
import queryString from 'query-string'

const LayerEntry = props => {
  const featureState = useContext(store)
  const { dispatch } = featureState;

  const [options, toggleOptions] = useState(false)
  const [olLayer, setLayer] = useState()
  const [checked, setChecked] = useState(props.layer.isVisible)
  const [transparency, setTransparency] = useState(50)
  const layer = props.layer
  layer.Name = (layer.name && typeof layer.name === 'object') ? layer.name.localPart : layer.Name

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
    return (
      <>
        <span className={style.spanCheckbox} >{textSpan}</span>
        <p hidden>{(layer.Layer ? 'Group layer' : 'layer')} </p>
      </>
    )
  }

  const onSelectionChange = currentNode => {
    let isNewLayer = true
    if (layer.Name) {
      let currentLayer
      if (props.meta.Type === 'OGC:WMS' || props.meta.Type === 'WMS' || props.meta.Type === 'WMS-tjeneste') {
        currentLayer = CapabilitiesUtil.getOlLayerFromWmsCapabilities(props.meta, currentNode)
      } else if (props.meta.Type === 'GEOJSON') {
        currentLayer = CapabilitiesUtil.getOlLayerFromGeoJson(props.meta, currentNode)
      } else if (props.meta.Type === 'OGC:WFS' || props.meta.Type === 'WFS' || props.meta.Type === 'WFS-tjeneste') {
        currentLayer = CapabilitiesUtil.getOlLayerFromWFS(props.meta, currentNode)
      }
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

        if (currentNode.queryable) {
          window.olMap.on('singleclick', function (evt) {
            const viewResolution = (window.olMap.getView().getResolution())
            const formats = currentLayer.getProperties().getFeatureInfoFormats
            let indexFormat = 0
            if (formats.indexOf('text/plain') > 0) { indexFormat = formats.indexOf('text/plain') }
            else if (formats.indexOf('text/xml') > 0) { indexFormat = formats.indexOf('text/xml') }
            else if (formats.indexOf('application/vnd.ogc.gml') > 0) { indexFormat = formats.indexOf('application/vnd.ogc.gml') }
            else if (formats.indexOf('application/json') > 0) { indexFormat = formats.indexOf('application/json') }
            else if (formats.indexOf('text/html') === 0) { indexFormat = 1 }

            const url = currentLayer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, window.olMap.getView().getProjection(), { INFO_FORMAT: formats[indexFormat] })
            if (url && currentLayer.getVisible()) {
              fetch(url)
                .then((response) => response.text())
                .then((data) => dispatch({ type: 'SET_FEATURES', show: true, info: parseFeatureInfo(data, formats[indexFormat]) }))
                .catch((error) => {
                  console.error('Error:', error)
                })
            }
          })
        } else {
          // Assume if not queryable then it could be geojson features
          window.olMap.on('click', function (evt) {
            const features = window.olMap.getFeaturesAtPixel(evt.pixel, (feature, layer) => feature)
            if (features) {
              features.forEach(feature => {
                const coord = feature.getGeometry().getCoordinates()
                feature.setStyle(new Style({
                  fill: new Fill({ color: 'rgba(255, 255, 255, 0.5)' }),
                  stroke: new Stroke({ color: '#310FD3', width: 3 }),
                  text: new Text({
                    font: '14px Calibri,sans-serif',
                    fill: new Fill({ color: '#000' }),
                    stroke: new Stroke({ color: '#fff', width: 5 }),
                    text: feature.get(props.meta.ShowPropertyName)
                  })
                }))
                let content = feature.get(props.meta.ShowPropertyName)
                let message = {
                  cmd: 'featureSelected',
                  featureId: feature.getId(),
                  properties: content,
                  coordinates: coord
                }
                //dispatch(setFeature(message))
              })
            }
          })
        }
      }
    }
  }

  const setOpacity = value => {
    setTransparency(value)
    if (olLayer) {
      olLayer.setOpacity(Math.min(transparency / 100, 1))
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

  const legendHandling = (layer) => {
    const legends = []
    const Layerstyle = layer.Style
    const layerName = layer.Name

    Layerstyle.forEach( style => {
      if (style.Name.includes('inspire_common:DEFAULT') || style.Name.includes('DEFAULT')) {
        const parsedUrl = queryString.parseUrl(style.LegendURL[0].OnlineResource);
        if (parsedUrl.query['layer'] === layerName) {
          legends.push(style.LegendURL[0].OnlineResource)
        }
      }
    })
    if (legends.length === 0) {
      Layerstyle.forEach(style => {
        if (style.LegendURL && style.LegendURL.length > 0 ) {
          legends.push(style.LegendURL[0].OnlineResource)
        }
      })
    }
    return legends
  }

  return (
    <>
      { layer.Name ? (
        <>
          <input className="checkbox" id={layer.Name} type="checkbox" />
          <label onClick={() => onSelectionChange(layer)} htmlFor={layer.Title}>
            <FontAwesomeIcon className="svg-checkbox" icon={checked ? ["far", "check-square"] : ["far", "square"]} />
          </label>
        </>
      ) : (
        <label onClick={() => onSelectionChange(layer)} htmlFor={layer.Title}> </label>
      )}
      { abstractTextSpan()}
      { layer.Name ? (
        <label onClick={() => toggleOptions(!options)}>
          <FontAwesomeIcon icon={["fas", "sliders-h"]} color={options ? "red" : "black"} />
        </label>
      ) : ('') }
      {
        layer.Style ? (legendHandling(layer).map((legend, index) => {
          return ( <InlineLegend key={index} legendUrl={legend} />)
          })
        ) : ('')
      }
      { options ? (
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
      { props.children}
      { layer.Layer ? (layer.Layer.map((subLayer, isub) => (<div className={style.facetSub} key={isub}><LayerEntry layer={subLayer} meta={props.meta} key={isub} /></div>))) : ('')}
    </>
  )
}

LayerEntry.propTypes = {
  layer: PropTypes.object,
  meta: PropTypes.object
}

export default LayerEntry
