import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import currentMap from './reducers/currentMap'
import hero from './reducers/hero'
import maps from './reducers/maps'
import programons from './reducers/programons'
import tileSize from './reducers/tileSize'

import heroSaga from './sagas/hero'

const reducer = combineReducers({
  currentMap,
  hero,
  maps,
  programons,
  tileSize,
})

function* rootSaga() {
  yield all([
    heroSaga(),
  ])
}

function logger() {
  return next => action => {
    console.log('Action', action.type, action.payload)

    return next(action)
  }
}

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger))

const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

// For debug purposes
window.store = store

export default store
