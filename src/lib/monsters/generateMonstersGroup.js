import generateMonster from './generateMonster'

function generateMonstersGroup(mapLevel, position) {
  const monsters = []
  const n = Math.min(mapLevel, 6)

  for (let i = 0; i < n; i++) {
    monsters.push(generateMonster(mapLevel))
  }

  return {
    monsters,
    position,
  }
}

export default generateMonstersGroup
