import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil"
import style from './ServicePanel.module.scss'
import { ExpandLess, ExpandMore, Close } from "@material-ui/icons"
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import LayerEntry from './LayerEntry'
import { store } from '../../Utils/store.js'
import { parseFeatureInfo } from '../../MapUtil/FeatureUtil'


const ServicePanel = props => {
  const featureState = useContext(store)
  const { dispatch } = featureState
  const [capabilities, setCapabilities] = useState()
  const [meta, setMeta] = useState()
  const [expanded, setState] = useState(true)
  useEffect(() => {
    let newMetaInfo = {}
    switch (props.services.DistributionProtocol) {
      case 'WMS':
      case 'WMS-tjeneste':
      case 'OGC:WMS':
        CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl)
          .then((capa) => {
            if (props.services.excludeLayers) {
              capa.Capability.Layer.Layer = capa.Capability.Layer.Layer.filter(
                e => !props.services.excludeLayers.includes(e.Name)
              )
            }
            setCapabilities(capa)
            newMetaInfo = CapabilitiesUtil.getWMSMetaCapabilities(capa)
            newMetaInfo.Type = 'OGC:WMS'
            newMetaInfo.Params = props.services.customParams || ''
            if (props.services.addLayers.length > 0) {
              let layersToBeAdded = []
              layersToBeAdded = capa.Capability.Layer.Layer.filter(
                e => props.services.addLayers.includes(e.Name)
              )
              if (layersToBeAdded.length === 0 || layersToBeAdded.length !== props.services.addLayers.length) {
                layersToBeAdded = []
                props.services.addLayers.forEach(layerName => {
                  layersToBeAdded.push({ Name: layerName })
                })
              }
              layersToBeAdded.forEach(layer => {
                let laycapaLayerer = CapabilitiesUtil.getOlLayerFromWmsCapabilities(newMetaInfo, layer)
                newMetaInfo.isVisible = true
                window.olMap.addLayer(laycapaLayerer)
                if (layer.queryable) {
                  window.olMap.on('singleclick', function (evt) {
                    const viewResolution = (window.olMap.getView().getResolution())
                    const formats = laycapaLayerer.getProperties().getFeatureInfoFormats
                    let indexFormat = 0
                    if (formats.includes('text/plain') ) { indexFormat = formats.indexOf('text/plain') }
                    else if (formats.indexOf('text/xml') > 0) { indexFormat = formats.indexOf('text/xml') }
                    else if (formats.indexOf('application/vnd.ogc.gml') > 0) { indexFormat = formats.indexOf('application/vnd.ogc.gml') }
                    else if (formats.indexOf('application/json') > 0) { indexFormat = formats.indexOf('application/json') }
                    else if (formats.indexOf('text/html') === 0) { indexFormat = 1 }

                    let url = laycapaLayerer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, window.olMap.getView().getProjection(), { INFO_FORMAT: formats[indexFormat] })
                    if (url.startsWith('http://rin-te')) {
                      url = 'https://norgeskart.no/ws/px.py?' + url
                    }
                    if (url && laycapaLayerer.getVisible()) {
                      fetch(url)
                        .then((response) => response.text())
                        .then((data) => dispatch({ type: 'SET_FEATURES', show: true, info: parseFeatureInfo(data, formats[indexFormat]) }))
                        .catch((error) => { console.error('Error:', error) })
                    }
                  })
                }
              })
            }
            setMeta(newMetaInfo)
          })
          .catch(e => console.warn(e))
        break
      case 'OGC:WMTS':
        CapabilitiesUtil.parseWmtsCapabilities(props.services.GetCapabilitiesUrl)
          .then((capa) => {
            setCapabilities(capa)
            newMetaInfo = CapabilitiesUtil.getWMSMetaCapabilities(capa)
            newMetaInfo.Type = 'OGC:WMTS'
            newMetaInfo.Params = props.services.customParams || ''
            setMeta(newMetaInfo)
          })
          .catch(e => console.warn(e))
        break
      case 'OGC:Features':
        CapabilitiesUtil.parseFeaturesCapabilities(props.services.GetCapabilitiesUrl)
          .then((capa) => {
            //console.log(capa)
            capa.forEach(path => {
              console.log(path)
              CapabilitiesUtil.getGeoJson(path[0])
              .then(layers => {
                setCapabilities(layers)
                newMetaInfo.Type = 'GEOJSON'
                newMetaInfo.ShowPropertyName = props.services.ShowPropertyName || 'id'
                newMetaInfo.EPSG = props.services.EPSG || 'EPSG:4258'
                setMeta(newMetaInfo)
              })
              .catch(e => console.warn(e))
            })
            /*
            setCapabilities(capa)
            newMetaInfo = CapabilitiesUtil.getWMSMetaCapabilities(capa)
            newMetaInfo.Type = 'OGC:WMS'
            newMetaInfo.Params = props.services.customParams || ''
            setMeta(newMetaInfo)
          */
        })
          .catch(e => console.warn(e))
        break
      case 'WFS':
      case 'WFS-tjeneste':
      case 'OGC:WFS':
        CapabilitiesUtil.parseWFSCapabilities(props.services.GetCapabilitiesUrl)
          .then((capa) => {
            setCapabilities(capa)
            newMetaInfo = CapabilitiesUtil.getWFSMetaCapabilities(capa)
            newMetaInfo.Type = 'WFS'
            newMetaInfo.Params = props.services.customParams || ''
            setMeta(newMetaInfo)
          })
          .catch(e => console.warn(e))
        break
      case 'GEOJSON':
        CapabilitiesUtil.getGeoJson(props.services.url)
          .then(layers => {
            setCapabilities(layers)
            newMetaInfo.Type = 'GEOJSON'
            newMetaInfo.ShowPropertyName = props.services.ShowPropertyName || 'id'
            newMetaInfo.EPSG = props.services.EPSG || 'EPSG:4326'
            setMeta(newMetaInfo)
          })
          .catch(e => console.warn(e))
        break
      default:
        console.warn('No service type specified')
        break
    }
  }, [props.services.DistributionProtocol, props.services.GetCapabilitiesUrl, props.services.url, props.services.ShowPropertyName, props.services.customParams, props.services.EPSG, props.services.addLayers])

  const renderRemoveButton = () => {
    if (props.removeMapItem) {
      return (
        <IconButton aria-label="close" className={ style.removeInline } onClick={ props.removeMapItem }>
          <Close />
        </IconButton>
      )
    } else {
      return ''
    }
  }

  const renderCapabilites = () => {
    if (capabilities && capabilities.Capability) {
      const capalayer = capabilities.Capability.Layer.Layer || capabilities.Capability.Layer
      if (Array.isArray(capalayer)) {
        return capalayer.map((capaLayer, i) => {
          return (
            <div className={ style.facet } key={ i }>
              <LayerEntry layer={ capaLayer } meta={ meta } key={ i } />
            </div>
          )
        })
      } else {
        return (
          <div className={ style.facet } key={ 0 }>
            <LayerEntry layer={ capalayer } meta={ meta } key={ 0 } />
          </div>
        )
      }
    } else if (capabilities && capabilities.value) {
      return capabilities.value.featureTypeList.featureType.map((capaLayer, i) => {
        return (
          <div className={ style.facet } key={ i }>
            <LayerEntry layer={ capaLayer } meta={ meta } key={ i } />
          </div>
        )
      })
    } else if (capabilities && capabilities.features) {
      return (
        <div className={ style.facet }>
          <LayerEntry layer={ capabilities } meta={ meta } />
        </div>
      )
    } else if (capabilities && capabilities.Contents) {
      return capabilities.Contents.Layer.map((capaLayer, i) => {
        return (
          <div className={ style.facet } key={ i }>
            <LayerEntry layer={ capaLayer } meta={ meta } capa={ capabilities } key={ i } />
          </div>
        )
      })
    } else {
      // console.warn(capabilities)
      return ''
    }
  }

  return (
    <div>
      <div onClick={ () => setState(!expanded) } className={ style.expandLayersBtn } >
        <span className={ style.ellipsisToggle }>{ props.services.Title }</span>
        <label style={ { fontStyle: "italic" } }>{ capabilities ? (capabilities.Service ? capabilities.Service.Abstract : '') : '' }</label>
        { expanded ? <ExpandLess /> : <ExpandMore /> }
      </div>
      { renderRemoveButton() }

      <List className={ expanded ? `${style.selectedlayers} ${style.open}` : style.selectedlayers } >
        { renderCapabilites() }
      </List>
    </div>
  )
}

ServicePanel.propTypes = {
  /**
   * The services to be parsed and shown in the panel
   * @type {Object} -- required
   */
  services: PropTypes.object.isRequired,
  removeMapItem: PropTypes.object

}

export default ServicePanel
