import { SET_FEATURES, SHOW_FEATURES, HIDE_FEATURES } from '../actions/FeatureActions'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_FEATURES:
      let appendedAInfo = ''
      if (state.info) {
        appendedAInfo = state.info.concat(action.info)
      } else {
        appendedAInfo = action.info
      }
      return {
        ...state,
        info: appendedAInfo,
        show: true
      }
    case SHOW_FEATURES:
      return {
        ...state,
        info: action.info,
        show: true
      }
    case HIDE_FEATURES:
      return {
        ...state,
        info: action.info,
        show: false
      }
    default:
      return { ...state, info: '', show: false }
  }
}
