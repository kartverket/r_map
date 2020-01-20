import { combineReducers } from 'redux'
import FeatureReducer from './FeatureReducer'
import SearchReducer from './SearchReducer'

export default () => combineReducers({
  FeatureReducer,
  SearchReducer
})

