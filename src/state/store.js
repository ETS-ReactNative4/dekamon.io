import { combineReducers, applyMiddleware, createStore } from 'redux'
import currentMap from './reducers/currentMap'
import hero from './reducers/hero'
import maps from './reducers/maps'

const reducer = combineReducers({
  currentMap,
  hero,
  maps,
})

function logger() {
  return next => action => {
    console.log('Action', action.type, action.payload)

    return next(action)
  }
}

const store = createStore(reducer, applyMiddleware(logger))

export default store
