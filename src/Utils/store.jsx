import React, { createContext, useReducer } from 'react'

const initialState = {}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state = {}, action) => {
    switch (action.type) {
      case 'SET_FEATURES':
        const appendedAInfo = state.info ? state.info.concat(action.info) : action.info
        return {
          ...state,
          info: appendedAInfo,
          show: true
        }
      case 'SHOW_FEATURES':
        return {
          ...state,
          info: action.info,
          show: true
        }
      case 'HIDE_FEATURES':
        return {
          ...state,
          info: [],
          show: false
        }
      default:
        throw new Error()
    };
  }, initialState)

  return <Provider value={ { state, dispatch } }>{ children }</Provider>
}

export { store, StateProvider }
