import store from '../state/store'
import generateWorldMap from './generateWorldMap'
import gameConfiguration from './gameConfiguration'
import { randomArray } from './utils'

function createNewGame() {
  // Generate and dispatch first map
  const firstWorldMap = generateWorldMap()

  store.dispatch({
    type: 'CREATE_MAP',
    payload: {
      position: [0, 0],
      ...firstWorldMap,
    },
  })

  // Place the hero on a road at random
  const firstWorldMapRoadPositions = []

  firstWorldMap.tiles.forEach((row, y) => {
    if (y !== 0 && y !== gameConfiguration.worldHeight - 1) {
      row.forEach((tile, x) => {
        if (tile.road && x !== 0 && x !== gameConfiguration.worldWidth - 1) {
          firstWorldMapRoadPositions.push({ x, y })
        }
      })
    }
  })

  const position = randomArray(firstWorldMapRoadPositions)

  store.dispatch({
    type: 'SET_HERO_POSITION',
    payload: {
      position,
      finalPosition: position,
    },
  })
}

export default createNewGame
