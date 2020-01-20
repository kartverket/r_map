
export const SET_FEATURES = 'SET_FEATURES'
export const SHOW_FEATURES = 'SHOW_FEATURES'
export const HIDE_FEATURES = 'HIDE_FEATURES'

export const setFeature = (features) => dispatch => {
  dispatch({
    type: SET_FEATURES,
    payload: features
  })
}
export const HideFeatureInfo = (features) => dispatch => {
  dispatch({
    type: HIDE_FEATURES,
    payload: features
  })
}
