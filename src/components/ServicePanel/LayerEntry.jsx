import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { UpOutlined, DownOutlined } from "@ant-design/icons"
import { Checkbox } from 'antd'
import style from './LayerEntry.module.scss'
import InlineLegend from '../Legend/InlineLegend'
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil"

//import { Messaging } from '../../Utils/communication'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { store } from '../../Utils/store.js'
import { parseFeatureInfo } from '../../MapUtil/FeatureUtil'

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
    return (<span className={ style.spanCheckbox }>{ textSpan }</span>)
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

  return (
    <>
      { layer.Name ? (
        <Checkbox id={ layer.Name } onChange={ () => onSelectionChange(layer) } checked={ checked }>{ abstractTextSpan() }</Checkbox>
      ) : (
          <label onClick={ () => onSelectionChange(layer) } htmlFor={ abstractTextSpan() }> </label>
        ) }
      { layer.Name ? (
        <label onClick={ () => toggleOptions(!options) }>
          { options ? <UpOutlined /> : <DownOutlined /> }
        </label>
      ) : ('') }
      <InlineLegend legendUrl={ ((layer.Style && layer.Style[0].LegendURL) ? layer.Style[0].LegendURL[0].OnlineResource : '') } />
      { options ? (
        <div className={ style.settings }>
          <label className={ style.slider }>
            Gjennomsiktighet:
            <input
              type="range"
              min={ 0 }
              max={ 100 }
              value={ transparency }
              onChange={ e => setOpacity(e.target.value) }
            />
          </label>
        </div>
      ) : (
          ""
        ) }
      { props.children }
      { layer.Layer ? (layer.Layer.map((subLayer, isub) => (<div className={ style.facetSub } key={ isub }><LayerEntry layer={ subLayer } meta={ props.meta } key={ isub } /></div>))) : ('') }
    </>
  )
}

LayerEntry.propTypes = {
  layer: PropTypes.object,
  meta: PropTypes.object
}

export default LayerEntry
