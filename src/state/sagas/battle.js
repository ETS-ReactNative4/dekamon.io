import { put, takeEvery } from 'redux-saga/effects'
// import store from '../store'
// import gameConfiguration from '../../lib/gameConfiguration'
import { randomPop, cloneArrayOfObjects } from '../../lib/utils'
import generateBattleMap, { ENNEMY_START_TILE } from '../../lib/battle/generateBattleMap'

function* beginBattle(action) {
  const battleMap = generateBattleMap()
  const monsters = cloneArrayOfObjects(action.payload)

  // Find start positions for ennemy monsters on the battleMap
  const monstersStartTiles = []

  battleMap.forEach((row, y) => {
    row.forEach((column, x) => {
      if (column === ENNEMY_START_TILE) monstersStartTiles.push({ x, y })
    })
  })

  // Assign a start position to each ennemy monster
  monsters.forEach(monster => monster.position = randomPop(monstersStartTiles))

  yield put({
    type: 'SET_BATTLE',
    payload: {
      turn: 1,
      battleMap,
      monsters,
    },
  })
}

function* battleSaga() {
  yield takeEvery('BEGIN_BATTLE', beginBattle)
}

export default battleSaga
