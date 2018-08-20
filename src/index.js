import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import './index.css'
import './normalize.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import generateMap from './lib/generateMap'
import gameConfiguration from './lib/gameConfiguration'
import { randomArray } from './lib/math'

const firstMap = generateMap()

store.dispatch({
  type: 'CREATE_MAP',
  payload: {
    position: [0, 0],
    ...firstMap,
  },
})

const firstMapRoadPositions = []

firstMap.tiles.forEach((row, y) => {
  if (y !== 0 && y !== gameConfiguration.worldHeight - 1) {
    row.forEach((tile, x) => {
      if (tile.road && x !== 0 && x !== gameConfiguration.worldWidth - 1) {
        firstMapRoadPositions.push({ x, y })
      }
    })
  }
})

store.dispatch({
  type: 'SET_HERO_POSITION',
  payload: {
    position: randomArray(firstMapRoadPositions),
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
