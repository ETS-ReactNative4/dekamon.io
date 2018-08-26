import { put, takeEvery } from 'redux-saga/effects'
import gameConfiguration from '../../lib/gameConfiguration'
import generateWorldMap from '../../lib/generateWorldMap'
import store from '../store'

function* updateWorldMap() {
  const { heroPosition, currentMap, maps } = store.getState()

  let { x, y } = currentMap.position
  let nextHeroPosition

  if (currentMap.entries.north && heroPosition.position.x === currentMap.entries.north && heroPosition.position.y === 0) {
    y--
    nextHeroPosition = {
      x: heroPosition.position.x,
      y: gameConfiguration.worldHeight - 1,
    }
  }
  if (currentMap.entries.south && heroPosition.position.x === currentMap.entries.south && heroPosition.position.y === gameConfiguration.worldHeight - 1) {
    y++
    nextHeroPosition = {
      x: heroPosition.position.x,
      y: 0,
    }
  }
  if (currentMap.entries.west && heroPosition.position.y === currentMap.entries.west && heroPosition.position.x === 0) {
    x--
    nextHeroPosition = {
      x: gameConfiguration.worldWidth - 1,
      y: heroPosition.position.y,
    }
  }
  if (currentMap.entries.east && heroPosition.position.y === currentMap.entries.east && heroPosition.position.x === gameConfiguration.worldWidth - 1) {
    x++
    nextHeroPosition = {
      x: 0,
      y: heroPosition.position.y,
    }
  }

  if (nextHeroPosition) {
    const nextMap = maps.find(map => map.position.x === x && map.position.y === y)

    if (nextMap) {
      yield put({ type: 'SET_CURRENT_MAP', payload: nextMap })
    }
    else {
      const entries = {}

      const northMap = maps.find(map => map.position.x === x && map.position.y === y - 1)
      const southMap = maps.find(map => map.position.x === x && map.position.y === y + 1)
      const westMap = maps.find(map => map.position.x === x - 1 && map.position.y === y)
      const eastMap = maps.find(map => map.position.x === x + 1 && map.position.y === y)

      if (northMap) entries.north = northMap.entries.south || null
      if (southMap) entries.south = southMap.entries.north || null
      if (westMap) entries.west = westMap.entries.east || null
      if (eastMap) entries.east = eastMap.entries.west || null

      // yield delay(5)

      yield put({
        type: 'CREATE_MAP',
        payload: {
          position: { x, y },
          ...generateWorldMap(entries),
        },
      })
    }

    // resolves race conditions
    yield new Promise(resolve => setTimeout(resolve, 10))

    yield put({
      type: 'SET_HERO_POSITION',
      payload: {
        position: nextHeroPosition,
        finalPosition: nextHeroPosition,
      },
    })
  }
}

function* heroPositionSaga() {
  yield takeEvery('POP_HERO_POSITION', updateWorldMap)
}

export default heroPositionSaga
