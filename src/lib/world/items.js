import { randomArray } from '../utils'

const normalTree = {
  create() {
    const leavesSource = randomArray([
      '/images/items/tree_object_01.png',
      '/images/items/tree_object_03.png',
      '/images/items/tree_object_04.png',
      '/images/items/tree_object_05.png',
      '/images/items/tree_object_06.png',
      '/images/items/tree_object_07.png',
    ])

    const trunkSource = randomArray([
      '/images/items/trunk_object_04.png',
      '/images/items/trunk_object_05.png',
    ])

    const shadowSource = '/images/items/shadow_01.png'

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
  draw(_, images, worldTileSize, x, y, parameters) {
    if (parameters.size === 1) {
      const shadowWidth = worldTileSize * 1.4
      const trunkWidth = worldTileSize * 0.7
      const leavesWidth = worldTileSize * 1.2
      const trunkHeight = trunkWidth * images[parameters.trunkSource].height / images[parameters.trunkSource].width
      const leavesHeight = leavesWidth * images[parameters.leavesSource].height / images[parameters.leavesSource].width

      _.globalAlpha = 0.5
      _.drawImage(
        images[parameters.shadowSource],
        (x - 0.2) * worldTileSize,
        (y + 0.25) * worldTileSize,
        shadowWidth,
        shadowWidth * images[parameters.shadowSource].height / images[parameters.shadowSource].width
      )
      _.globalAlpha = 1
      _.drawImage(
        images[parameters.trunkSource],
        (x + 0.15) * worldTileSize,
        (y + 0.8) * worldTileSize - trunkHeight,
        trunkWidth,
        trunkHeight
      )
      _.drawImage(
        images[parameters.leavesSource],
        (x - 0.1) * worldTileSize,
        (y + 0.25) * worldTileSize - leavesHeight,
        leavesWidth,
        leavesHeight
      )
    }
    if (parameters.size === 2) {
      const shadowWidth = worldTileSize * 1.5
      const trunkWidth = worldTileSize * 0.8
      const leavesWidth = worldTileSize * 1.4
      const trunkHeight = trunkWidth * images[parameters.trunkSource].height / images[parameters.trunkSource].width
      const leavesHeight = leavesWidth * images[parameters.leavesSource].height / images[parameters.leavesSource].width

      _.globalAlpha = 0.5
      _.drawImage(
        images[parameters.shadowSource],
        (x - 0.25) * worldTileSize,
        (y + 0.15) * worldTileSize,
        shadowWidth,
        shadowWidth * images[parameters.shadowSource].height / images[parameters.shadowSource].width
      )
      _.globalAlpha = 1
      _.drawImage(
        images[parameters.trunkSource],
        (x + 0.1) * worldTileSize,
        (y + 0.8) * worldTileSize - trunkHeight,
        trunkWidth,
        trunkHeight
      )
      _.drawImage(
        images[parameters.leavesSource],
        (x - 0.2) * worldTileSize,
        (y + 0.1) * worldTileSize - leavesHeight,
        leavesWidth,
        leavesHeight
      )
    }
  },
}

const rock = {
  create() {
    const rockSource = randomArray([
      '/images/items/stone_object_01.png',
      '/images/items/stone_object_02.png',
      '/images/items/stone_object_03.png',
      '/images/items/stone_object_04.png',
      '/images/items/stone_object_05.png',
      '/images/items/stone_object_06.png',
      '/images/items/stone_object_07.png',
      '/images/items/stone_object_08.png',
      '/images/items/stone_object_09.png',
      '/images/items/stone_object_10.png',
    ])

    const shadowSource = '/images/items/shadow_01.png'

    return {
      imageSources: [rockSource, shadowSource],
      parameters: {
        rockSource,
        shadowSource,
      },
    }
  },
  draw(_, images, worldTileSize, x, y, parameters) {
    const shadowWidth = worldTileSize * 1.2
    const rockWidth = worldTileSize * 0.8
    const rockHeight = rockWidth * images[parameters.rockSource].height / images[parameters.rockSource].width

    _.globalAlpha = 0.5
    _.drawImage(
      images[parameters.shadowSource],
      (x - 0.1) * worldTileSize,
      (y + 0.35) * worldTileSize,
      shadowWidth,
      shadowWidth * images[parameters.shadowSource].height / images[parameters.shadowSource].width
    )
    _.globalAlpha = 1
    _.drawImage(
      images[parameters.rockSource],
      (x + 0.1) * worldTileSize,
      (y + 0.9) * worldTileSize - rockHeight,
      rockWidth,
      rockHeight
    )
  },
}

export const items = {
  normalTree,
  rock,
}

// Must sum up to 1
export const biomeToItemProbabilities = {
  clay: {},
  grass_01: {
    normalTree: 0.85,
    rock: 0.15,
  },
  grass_02: {
    normalTree: 0.85,
    rock: 0.15,
  },
  paving_01: {},
  paving_02: {},
  sand_01: {},
  sand_02: {},
  snow_01: {},
  snow_02: {},
  lava_01: {},
}
