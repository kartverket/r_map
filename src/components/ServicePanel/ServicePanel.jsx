import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CapabilitiesUtil } from "../../MapUtil/CapabilitiesUtil";
import './ServicePanel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LayerEntry from './LayerEntry';


const ServicePanel = props => {
  const [capabilities, setCapabilities] = useState()
  const [meta, setMeta] = useState()
  const [expanded, setState] = useState(false)

  useEffect(() => {
    let newMetaInfo = {}
    switch (props.services.DistributionProtocol) {
      case 'WMS':
      case 'OGC:WMS':
        CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl)
          .then((capa) => {
            setCapabilities(capa)
            newMetaInfo = CapabilitiesUtil.getMetaCapabilities(capa)
            newMetaInfo.Type = 'OGC:WMS'
            setMeta(newMetaInfo)
          })
          .catch(e => console.log(e))
        break
      case 'WFS':
        CapabilitiesUtil.parseWFSCapabilities(props.services.GetCapabilitiesUrl)
          //.then(CapabilitiesUtil.getLayersFromWfsCapabilties)
          .then((capa) => {
            setCapabilities(capa)
            newMetaInfo.Type = 'WFS'
            setMeta(newMetaInfo)
          })
          .catch(e => console.log(e))
        break;
      case 'GEOJSON':
        CapabilitiesUtil.getGeoJson(props.services.url)
          .then(layers => {
            setCapabilities(layers)
            newMetaInfo.Type = 'GEOJSON'
            setMeta(newMetaInfo)
          })
          .catch(e => console.log(e));
        break;
      default:
        console.warn('No service type specified')
        break
    }
  }, [props.services.DistributionProtocol, props.services.GetCapabilitiesUrl, props.services.url])

  const renderRemoveButton = () => {
    if (props.removeMapItem) {
      return (
        <FontAwesomeIcon className="remove-inline" onClick={this.props.removeMapItem} icon={['fas', 'times']} />
      );
    } else {
      return ''
    }
  }

  const renderCapabilites = () => {
    if (capabilities && capabilities.Capability) {
      return capabilities.Capability.Layer.Layer.map((capaLayer, i) => {
        return (
          <div className="facet" key={i}>
            <LayerEntry layer={capaLayer} meta={meta} key={i} />
            {
              capaLayer.Layer ? (
                capaLayer.Layer.map((subLayer, isub) => (<div className="facet-sub"><LayerEntry layer={subLayer} meta={meta} key={isub} /></div>))
              ) : ('')
            }
          </div>
        )
      })
    } else if (capabilities && capabilities.features) {
      return (
        <div className="facet">
          <LayerEntry layer={capabilities} meta={meta} />
        </div>
      )
    } else {
      console.warn('Something went wrong when parsing the capabilities')
      console.warn(capabilities)
      return ''
    }
  }

  return (
    <div>
      <div onClick={() => setState(!expanded)} className={'expand-layers-btn'} >
        <span className={'ellipsis-toggle'}>{props.services.Title}</span>
        <FontAwesomeIcon icon={expanded ? ['fas', 'angle-up'] : ['fas', 'angle-down']} />
      </div>
      {renderRemoveButton()}

      <div className={expanded ? 'selectedlayers open' : 'selectedlayers'} >
        {renderCapabilites()}
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

};

export default ServicePanel
