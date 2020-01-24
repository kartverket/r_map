import React from "react"
import Modal from 'react-bootstrap/Modal'
import { useSelector, useDispatch } from "react-redux"
import style from './FeatureInfoItem.module.scss'


const FeatureInfoItem = props => {
  const dispatch = useDispatch()
  const featureState = useSelector(state => state.FeatureReducer)

  const testFormat = (s) => {
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
      for (const key in layer) {
        if (key !== 'name') {
          const feature = layer[key]
          for (const key in feature) {
            const items = feature[key]
            for (const key in items) {
              const item = items[key]
              for (let [key, value] of Object.entries(item)) {
                featureRow.push(<li><i>{ key } </i> = <strong>{ prepareItemFormat(value) }</strong> </li>)
              }
            }
          }
        }
      }
      layers.push(<div><h3>{ key }</h3>{ featureRow }</div>)
    }
    return (<ul className={ style.ulContainer }>{ layers }</ul>)
  }

  return (
    <Modal show={ featureState.show } onHide={ () => dispatch({
      type: "HIDE_FEATURES",
      info: featureState.info
    }) }>
      <Modal.Header closeButton>
        <Modal.Title>Feature Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ featureState.info.map((info) => prepareFeature(info)) }</Modal.Body>
    </Modal>
  )
}

export default FeatureInfoItem
