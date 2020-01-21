import React, { useState } from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import style from './LayerEntry.module.scss'
import InlineLegend from '../Legend/InlineLegend'
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil"

//import { Messaging } from '../../Utils/communication'
import { useDispatch } from "react-redux"
import { setFeature } from '../../actions/FeatureActions'

const LayerEntry = props => {
  const [options, toggleOptions] = useState(false)
  const [olLayer, setLayer] = useState()
  const [checked, setChecked] = useState(props.layer.isVisible)
  const [transparency, setTransparency] = useState(50)
  const layer = props.layer
  layer.Name = (layer.name && typeof layer.name === 'object') ? layer.name.localPart : layer.Name
  const dispatch = useDispatch()

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
    return (<span>{ textSpan }</span>)
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
            const url = currentLayer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, window.olMap.getView().getProjection(), { INFO_FORMAT: 'text/plain' })
            if (url && currentLayer.getVisible()) {
              fetch(url)
                .then((response) => response.text())
                .then((data) => {
                  const responseText = data
                  /*
                  if (data.includes('Layer')) {
                    let featureInfo = data.split("\n\n")
                    featureInfo.shift()
                    data = featureInfo.map((layer) => {
                      let r_layer = {}
                      let subf = layer.split(/(Layer[^\r\n]*)/)
                      subf.shift()
                      let layerName = subf.splice(0, 1)[0].split('Layer ')[1].replace(/'/g, '')
                      r_layer[layerName] = subf.map((f) => {
                        let feature = f.split(/(Feature[^\r\n]*)/)
                        let tmp_feature = {}
                        feature.shift()
                        let faetureId = feature.splice(0, 1)[0].split('Feature ')[1].replace(/:/g, '').trim()
                        feature = feature.map((item) => {
                          item = item.trim()
                          item = item.replace(/=/g, ':').split('\n').map((item) => {
                            let obj = {}
                            let [key, value] = item.trim().split(' :')
                            obj[key] = value.replace(/'/g, '').trim()
                            return obj
                          })
                          return { ...item }
                        })
                        tmp_feature[faetureId] = feature.flat()
                        return tmp_feature
                      })
                      return r_layer
                    })
                    console.log({ GetFeatureInfo: data })
                  }
                  let message = {
                    cmd: 'featureSelected',
                    properties: data,
                  }
                  Messaging.postMessage(JSON.stringify(message))
                  */
                 dispatch(setFeature(responseText))
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
        <>
          <input className="checkbox" id={ layer.Name } type="checkbox" />
          <label onClick={ () => onSelectionChange(layer) } htmlFor={ layer.Title }>
            <FontAwesomeIcon className="svg-checkbox" icon={ checked ? ["far", "check-square"] : ["far", "square"] } />
          </label>
        </>
      ) : (
          <label onClick={ () => onSelectionChange(layer) } htmlFor={ layer.Title }> </label>
        ) }
      { abstractTextSpan() }
      { layer.Name ? (
        <label onClick={ () => toggleOptions(!options) }>
          <FontAwesomeIcon icon={ ["far", "sliders-h"] } color={ options ? "red" : "black" } />
        </label>
      ) : ('') }
      <InlineLegend legendUrl={ ((layer.Style && layer.Style[0].LegendURL) ? layer.Style[0].LegendURL[0].OnlineResource : '') } />
      { options ? (
        <div className={ style.settings }>
          {/** Tar ut prio buttone for nå *
          <div>
            <button className={style.movelayerBtn} onClick={() => setLayerIndex(index + 1)}>Flytt fremover<FontAwesomeIcon title="Vis laget over"  icon={['fas', 'arrow-up']} /></button>
            <button className={style.movelayerBtn} onClick={() => setLayerIndex(index - 1)}>Flytt bakover <FontAwesomeIcon  title="Vis laget under" icon={['fas','arrow-down']} /></button>
            <span className={style.priority}>Prioritet: {index}</span>
          </div>
           */}
          {/** TODO: STYLE the slider */ }
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
