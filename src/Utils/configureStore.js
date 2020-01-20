import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import createRootReducer from '../reducers';

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
})


export default function configureStore(preloadedState) {
  const middleware = [thunk]
  const store = createStore(
    createRootReducer(),
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )

  //loadUser(store, userManager)

  return store
}
