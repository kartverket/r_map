
export const SET_FEATURES = 'SET_FEATURES'
export const SHOW_FEATURES = 'SHOW_FEATURES'
export const HIDE_FEATURES = 'HIDE_FEATURES'

export const setFeature = (features) => ({
  type: SET_FEATURES,
  info: features
})

export const hideFeatureInfo = (features) => ({
  type: HIDE_FEATURES,
  info: features
})

