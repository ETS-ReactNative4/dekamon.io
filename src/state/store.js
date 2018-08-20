import { combineReducers, applyMiddleware, createStore } from 'redux'
import currentMap from './reducers/currentMap'
import heroPosition from './reducers/heroPosition'
import maps from './reducers/maps'

const reducer = combineReducers({
  currentMap,
  heroPosition,
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
