import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil"
import style from './ServicePanel.module.scss'
import { UpOutlined, DownOutlined, CloseOutlined } from "@ant-design/icons"
import LayerEntry from './LayerEntry'


const ServicePanel = props => {
  const [capabilities, setCapabilities] = useState()
  const [meta, setMeta] = useState()
  const [expanded, setState] = useState(false)

  useEffect(() => {
    let newMetaInfo = {}
    switch (props.services.DistributionProtocol) {
      case 'WMS':
      case 'WMS-tjeneste':
      case 'OGC:WMS':
        CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl)
          .then((capa) => {
            setCapabilities(capa)
            newMetaInfo = CapabilitiesUtil.getWMSMetaCapabilities(capa)
            newMetaInfo.Type = 'OGC:WMS'
            newMetaInfo.Params = props.services.customParams || ''
            setMeta(newMetaInfo)
          })
          .catch(e => console.log(e))
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
          .catch(e => console.log(e))
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
          .catch(e => console.log(e))
        break
      default:
        console.warn('No service type specified')
        break
    }
  }, [props.services.DistributionProtocol, props.services.GetCapabilitiesUrl, props.services.url, props.services.ShowPropertyName, props.services.customParams, props.services.EPSG])

  const renderRemoveButton = () => {
    if (props.removeMapItem) {
      return (
        <CloseOutlined className={ style.removeInline } onClick={ this.props.removeMapItem }/>
      )
    } else {
      return ''
    }
  }

  const renderCapabilites = () => {
    if (capabilities && capabilities.Capability) {
      return capabilities.Capability.Layer.Layer.map((capaLayer, i) => {
        return (
          <div className={ style.facet } key={ i }>
            <LayerEntry layer={ capaLayer } meta={ meta } key={ i } />
          </div>
        )
      })
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
    } else {
      // console.warn(capabilities)
      return ''
    }
  }

  return (
    <div>
      <div onClick={ () => setState(!expanded) } className={ style.expandLayersBtn } >
        <span className={ style.ellipsisToggle }>{ props.services.Title }</span>
        { expanded ? <UpOutlined /> : <DownOutlined /> }
      </div>
      { renderRemoveButton() }

      <div className={ expanded ? `${style.selectedlayers} ${style.open}` : style.selectedlayers } >
        { renderCapabilites() }
      </div>
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
