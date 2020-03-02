import React from "react"
import Modal from 'react-bootstrap/Modal'
import style from './FeatureInfoItem.module.scss'
import uniqid from 'uniqid'
import { useStore, setStore } from 'react-smee'

const FeatureInfoItem = props => {
  const featureState = useStore('featureInfo')

  const testFormat = (s) => {
    if (typeof s === 'object') return 'isObject'
    const rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i
    const M = rX.exec(s)
    if (!M) return ''
    switch (M[1]) {
      case M[2]: return 'isNumeric'
      case M[3]: return 'isBoolean'
      case M[4]: return 'isDate'
      case M[5]: {
        if (M[5].length === 50 || M[5].length === 194) {
          return 'isBboxInternal'
        } else if (M[5].startsWith('{"type":"Point"')) {
          return 'isBboxJsonPoint'
        } else if (M[5].startsWith('{"type":"Polygon"')) {
          return 'isBboxJsonPolygon'
        } else if (M[5].startsWith('BOX(')) {
          return 'isBboxSimple'
        } else {
          return 'isString'
        }
      }
      default: return false
    }
  }

  const prepareItemFormat = (v) => {
    const test = testFormat(v)
    switch (test) {
      case 'isNumeric': return <>{ v }</>
      case 'isBoolean': return <>{ v }</>
      case 'isDate': return <>{ v }</> // TODO: formatt?
      case 'isBboxInternal': return <>BBOX db internal</> // TODO: klikke for å vise?
      case 'isBboxJsonPoint': return <>BBOX point</> // TODO: klikke for å vise?
      case 'isBboxJsonPolygon': return <>BBOX polygon</> // TODO: klikke for å vise?
      case 'isBboxSimple': return <>{ v }</> // TODO: klikke for å vise?
      case 'isString': return <>{ v }</>
      default: return <></>
    }
  }

  const prepareFeature = (info) => {
    let layers = []
    for (const key in info) {
      let layer = info[key]
      let featureRow = []
      if (Array.isArray(layer)) {
        for (const key in layer) {
          if (key !== 'name') {
            const feature = layer[key]
            for (const key in feature) {
              const items = feature[key]
              for (let [key, value] of Object.entries(items)) {
                featureRow.push(<li key={ uniqid(key) }><i>{ key } </i> = <strong>{ prepareItemFormat(value) }</strong> </li>)
              }
            }
          }
        }
      } else {
        for (let [key, value] of Object.entries(layer)) {
          featureRow.push(<li key={ uniqid(key) }><i>{ key } </i> = <strong>{ prepareItemFormat(value) }</strong> </li>)
        }
      }
      layers.push(<React.Fragment key={ uniqid(key) }><h3>{ key }</h3><ul>{ featureRow }</ul></React.Fragment>)
    }
    return (<div className={ style.ulContainer } key={ uniqid() }>{ layers }</div>)
  }

  return (
    <Modal show={ featureState.show } onHide={ () => setStore('featureInfo', () => {
      let info = {
        show: false,
        info: featureState.info
      }
      return info
    }
    ) }>
      <Modal.Header closeButton>
        <Modal.Title>Egenskaper <span> ( { featureState.info.length } )</span> </Modal.Title>
      </Modal.Header>
      <Modal.Body>{ featureState.info.map((info) => prepareFeature(info)) }</Modal.Body>
    </Modal>
  )
}

export default FeatureInfoItem
