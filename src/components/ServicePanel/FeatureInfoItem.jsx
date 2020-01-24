import React from "react"
import Modal from 'react-bootstrap/Modal'
import { useSelector, useDispatch } from "react-redux"
import style from './FeatureInfoItem.module.scss'


const FeatureInfoItem = props => {
  const dispatch = useDispatch()
  const featureState = useSelector(state => state.FeatureReducer)

  const prepareFeature = (info) => {
    let layers = []
    for (const key in info) {
      let layer = info[key]
      let items = []
      for (const key in layer) {
        if (key !== 'name') {
          const feature = layer[key]
          for (const key in feature) {
            const item = feature[key]
            if (typeof item !== 'object') {
              items.push(<li><i>{ key } </i> = <strong>{ item }</strong> </li>)
            }
          }
        }
      }      
      layers.push(<div><h3>{ layer.name }</h3>{ items }</div>)
    }
    
    return (<ul className={style.ulContainer}>{ layers }</ul>)
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
