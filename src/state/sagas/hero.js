import { put, takeEvery } from 'redux-saga/effects'
import gameConfiguration from '../../lib/gameConfiguration'
import generateWorldMap from '../../lib/generateWorldMap'
import store from '../store'

function* updateWorldMap() {
  const { hero, currentMap, maps } = store.getState()

  if (hero.position.x !== hero.destination.x || hero.position.y !== hero.destination.y) return

  let { x, y } = currentMap.position
  let nextHeroPosition

  if (currentMap.entries.north && hero.position.x === currentMap.entries.north && hero.position.y === 0) {
    y--
    nextHeroPosition = {
      x: hero.position.x,
      y: gameConfiguration.worldHeight - 1,
    }
  }
  if (currentMap.entries.south && hero.position.x === currentMap.entries.south && hero.position.y === gameConfiguration.worldHeight - 1) {
    y++
    nextHeroPosition = {
      x: hero.position.x,
      y: 0,
    }
  }
  if (currentMap.entries.west && hero.position.y === currentMap.entries.west && hero.position.x === 0) {
    x--
    nextHeroPosition = {
      x: gameConfiguration.worldWidth - 1,
      y: hero.position.y,
    }
  }
  if (currentMap.entries.east && hero.position.y === currentMap.entries.east && hero.position.x === gameConfiguration.worldWidth - 1) {
    x++
    nextHeroPosition = {
      x: 0,
      y: hero.position.y,
    }
  }

  if (nextHeroPosition) {
    const nextMap = maps.find(map => map.position.x === x && map.position.y === y)

    yield put({
      type: 'SET_HERO_POSITION',
      payload: {
        position: nextHeroPosition,
        destination: nextHeroPosition,
      },
    })

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
  }
}

function updateHeroPosition() {
  const { tileSize, hero: { position, canvasPosition, destination, path }} = store.getState()

  const heroIsAtFinalPosition = position.x === destination.x && position.y === destination.y


}

function* heroSaga() {
  yield takeEvery('POP_HERO_POSITION', updateWorldMap)
  yield takeEvery('SET_HERO_DESTINATION', updateHeroPosition)
}

export default heroSaga
