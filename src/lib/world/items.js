import { randomArray } from '../utils'

const normalTree = {
  create() {
    const leavesSource = randomArray([
      '/images/Objects/tree_object_01.png',
      '/images/Objects/tree_object_02.png',
      '/images/Objects/tree_object_03.png',
      '/images/Objects/tree_object_04.png',
      '/images/Objects/tree_object_05.png',
      '/images/Objects/tree_object_06.png',
      '/images/Objects/tree_object_07.png',
    ])

    const trunkSource = randomArray([
      '/images/Objects/trunk_object_04.png',
      '/images/Objects/trunk_object_05.png',
    ])

    const shadowSource = '/images/Objects/shadow_01.png'

    const size = randomArray([1, 2])

    return {
      imageSources: [leavesSource, trunkSource, shadowSource],
      parameters: {
        leavesSource,
        trunkSource,
        shadowSource,
        size,
      },
    }
  },
  draw(_, images, tileSize, x, y, parameters) {
    if (parameters.size === 1) {
      _.globalAlpha = 0.5
      _.drawImage(images[parameters.shadowSource], (x - 0.15) * tileSize, (y - 0.1) * tileSize, tileSize * 1.3, tileSize * 1.3)
      _.globalAlpha = 1
      _.drawImage(images[parameters.trunkSource], (x + 0.15) * tileSize, (y + 0) * tileSize, tileSize * 0.7, tileSize * 0.7)
      _.drawImage(images[parameters.leavesSource], (x - 0.1) * tileSize, (y - 1) * tileSize, tileSize * 1.2, tileSize * 1.2)
    }
    if (parameters.size === 2) {
      _.globalAlpha = 0.5
      _.drawImage(images[parameters.shadowSource], (x - 0.2) * tileSize, (y - 0.1) * tileSize, tileSize * 1.4, tileSize * 1.4)
      _.globalAlpha = 1
      _.drawImage(images[parameters.trunkSource], (x + 0.1) * tileSize, (y - 0.1) * tileSize, tileSize * 0.8, tileSize * 0.8)
      _.drawImage(images[parameters.leavesSource], (x - 0.2) * tileSize, (y - 1.25) * tileSize, tileSize * 1.4, tileSize * 1.4)
    }
  },
}

// export function palmTree() {
//
// }
//
// export function pineTree() {
//
// }

export const items = {
  normalTree,
}

// Must sum up to 1
export const biomeToItemProbabilities = {
  clay: {},
  grass_01: {
    normalTree: 1,
  },
  grass_02: {
    normalTree: 1,
  },
  paving_01: {},
  paving_02: {},
  sand_01: {},
  sand_02: {},
  snow_01: {},
  snow_02: {},
  lava_01: {},
}
