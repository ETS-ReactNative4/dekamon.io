import randomMonsterName from './monsterNames'
import randomMonsterAvatarSource from './monsterAvatars'
import { randomRange } from '../utils'

function generateMonster(level) {
  return {
    name: randomMonsterName(),
    avatarSource: randomMonsterAvatarSource(),
    attack: randomRange(Math.floor(level / 2), level),
    defense: randomRange(Math.floor(level / 2), level),
    movement: Math.min(6, randomRange(Math.floor(level / 2), level)),
  }
}

export default generateMonster
