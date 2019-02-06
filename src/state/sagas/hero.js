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
    yield put({
      type: 'SET_HERO_POSITION',
      payload: {
        position: nextHeroPosition,
        destination: nextHeroPosition,
      },
    })

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
        payload: generateWorldMap(entries, { x, y }),
      })
    }
  }
}

// The loop that make the hero move
let interval

// Move hero
function updateHeroPosition() {
  const {
    position,
    canvasOffset,
    nextPosition,
    destination,
    path,
  } = store.getState().hero

  clearInterval(interval)

  const offset = canvasOffset.x || canvasOffset.y
  const heroIsOffseted = Math.abs(offset) > 0.05
  const heroIsAtDestination = position.x === destination.x && position.y === destination.y

  // If destination has been updated and the hero is offseted
  // we need to cancel or complete the offset first
  // before we can remuse walking the path
  if (heroIsOffseted) {
    const nextPositionIsOnPath = nextPosition.x === path[0].x && nextPosition.y === path[0].y
    const diffX = nextPosition.x - position.x
    const diffY = nextPosition.y - position.y

    let c = Math.abs(offset)

    return interval = setInterval(() => {
      if (nextPositionIsOnPath) c += 0.1 // complete the offset
      else c -= 0.1 // cancel the offset

      if (c >= 1) { // complete the offset - end
        clearInterval(interval)

        return store.dispatch({
          type: 'POP_HERO_POSITION',
        })
      }

      if (c < 0) { // cancel the offset - end
        clearInterval(interval)

        return store.dispatch({
          type: 'UPDATE_HERO_POSITION',
        })
      }

      // Update canvasOffset
      store.dispatch({
        type: 'SET_HERO_POSITION',
        payload: {
          canvasOffset: {
            x: diffX * c,
            y: diffY * c,
          },
        },
      })
    }, 25)
  }

  // If hero is not at destination we walk the path
  if (!heroIsAtDestination) {
    const diffX = path[0].x - position.x
    const diffY = path[0].y - position.y

    let c = 0 // canvas offset

    interval = setInterval(() => {
      c += 0.1

      // When offset is completed we clear the interval and pop the path
      if (c >= 1) {
        clearInterval(interval)

        return store.dispatch({
          type: 'POP_HERO_POSITION',
        })
      }

      // Update canvasOffset
      store.dispatch({
        type: 'SET_HERO_POSITION',
        payload: {
          canvasOffset: {
            x: diffX * c,
            y: diffY * c,
          },
        },
      })
    }, 25)
  }
}

function* heroSaga() {
  yield takeEvery('POP_HERO_POSITION', updateWorldMap)
  yield takeEvery('SET_HERO_DESTINATION', updateHeroPosition)
  yield takeEvery('POP_HERO_POSITION', updateHeroPosition)
  yield takeEvery('UPDATE_HERO_POSITION', updateHeroPosition)
}

export default heroSaga
