import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import currentMap from './reducers/currentMap'
import heroPosition from './reducers/heroPosition'
import maps from './reducers/maps'
import programons from './reducers/programons'

import heroPositionSaga from './sagas/heroPosition'

const reducer = combineReducers({
  currentMap,
  heroPosition,
  maps,
  programons,
})

function* rootSaga() {
  yield all([
    heroPositionSaga(),
  ])
}

function logger() {
  return next => action => {
    console.log('Action', action.type, action.payload)

    return next(action)
  }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga)

export default store
