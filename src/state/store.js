import { combineReducers, applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import throttle from 'lodash.throttle'

import { loadState, saveState } from './persist'

import battle from './reducers/battle'
import battleTileSize from './reducers/battleTileSize'
import worldMap from './reducers/worldMap'
import hero from './reducers/hero'
import worldMaps from './reducers/worldMaps'
import monstersInventory from './reducers/monstersInventory'
import worldTileSize from './reducers/worldTileSize'

import battleSaga from './sagas/battle'
import heroSaga from './sagas/hero'

const reducer = combineReducers({
  battle,
  battleTileSize,
  worldMap,
  hero,
  worldMaps,
  monstersInventory,
  worldTileSize,
})

function* rootSaga() {
  yield all([
    battleSaga(),
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
const persistedState = loadState()

const store = createStore(reducer, persistedState, enhancer)

sagaMiddleware.run(rootSaga)

// Save persisted state
store.subscribe(throttle(() => saveState(store.getState()), 1000))

// For debug purposes
window.store = store

export default store
