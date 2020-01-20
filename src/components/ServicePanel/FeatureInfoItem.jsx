import React from "react"
import Modal from 'react-bootstrap/Modal'

import { useSelector, useDispatch } from "react-redux"

const FeatureInfoItem = props => {
  /* Show the text/plain from a getFeatureInfo call for now in a <pre> tag from bootstrap modal, need more testing and work to decide on text/plain vs text/gml */
  const dispatch = useDispatch()
  const featureState = useSelector(state => {
    return state.FeatureReducer
  })
  console.log(featureState)

  return (
    <Modal show={ featureState.show } onHide={ () =>  dispatch({
      type: "HIDE_FEATURES",
      payload: featureState.info
    }) }>
      <Modal.Header closeButton>
        <Modal.Title>Feature Info</Modal.Title>
      </Modal.Header>
      <Modal.Body><pre>{ featureState.info }</pre></Modal.Body>
    </Modal>
  )
}

export default FeatureInfoItem
