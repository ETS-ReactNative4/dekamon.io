import store from '../state/store'
import generateWorldMaps from './world/generateWorldMaps'
import generateMonster from './monsters/generateMonster'
import gameConfiguration from './gameConfiguration'
import { randomArray } from './utils'

function createNewGame() {
  // Generate and dispatch first map
  const firstWorldMaps = generateWorldMaps({}, { x: 0, y: 0 })

  store.dispatch({
    type: 'CREATE_MAP',
    payload: firstWorldMaps,
  })

  // Place the hero on a road at random
  const firstWorldMapsRoadPositions = []

  firstWorldMaps.tiles.forEach((row, y) => {
    if (y !== 0 && y !== gameConfiguration.worldHeight - 1) {
      row.forEach((tile, x) => {
        if (tile.road && x !== 0 && x !== gameConfiguration.worldWidth - 1) {
          firstWorldMapsRoadPositions.push({ x, y })
        }
      })
    }
  })

  const position = randomArray(firstWorldMapsRoadPositions)

  store.dispatch({
    type: 'SET_HERO_POSITION',
    payload: {
      position,
      destination: position,
      canvasOffset: { x: 0, y: 0 },
    },
  })

  store.dispatch({
    type: 'PLACE_MONSTER_IN_INVENTORY',
    payload: {
      ...generateMonster(),
      attack: 2,
      defense: 2,
      movement: 3,
    },
  })
}

export default createNewGame
