import { randomArray } from '../utils'

const normalTree = {
  create() {
    const leavesSource = randomArray([
      '/images/Objects/tree_object_01.png',
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
      const shadowScale = tileSize * 1.4
      const trunkScale = tileSize * 0.7
      const leavesScale = tileSize * 1.2
      const trunkHeight = trunkScale * images[parameters.trunkSource].height / images[parameters.trunkSource].width
      const leavesHeight = leavesScale * images[parameters.leavesSource].height / images[parameters.leavesSource].width

      _.globalAlpha = 0.5
      _.drawImage(
        images[parameters.shadowSource],
        (x - 0.2) * tileSize,
        (y + 0.25) * tileSize,
        shadowScale,
        shadowScale * images[parameters.shadowSource].height / images[parameters.shadowSource].width
      )
      _.globalAlpha = 1
      _.drawImage(
        images[parameters.trunkSource],
        (x + 0.15) * tileSize,
        (y + 0.8) * tileSize - trunkHeight,
        trunkScale,
        trunkHeight
      )
      _.drawImage(
        images[parameters.leavesSource],
        (x - 0.1) * tileSize,
        (y + 0.25) * tileSize - leavesHeight,
        leavesScale,
        leavesHeight
      )
    }
    if (parameters.size === 2) {
      const shadowScale = tileSize * 1.5
      const trunkScale = tileSize * 0.8
      const leavesScale = tileSize * 1.4
      const trunkHeight = trunkScale * images[parameters.trunkSource].height / images[parameters.trunkSource].width
      const leavesHeight = leavesScale * images[parameters.leavesSource].height / images[parameters.leavesSource].width

      _.globalAlpha = 0.5
      _.drawImage(
        images[parameters.shadowSource],
        (x - 0.25) * tileSize,
        (y + 0.15) * tileSize,
        shadowScale,
        shadowScale * images[parameters.shadowSource].height / images[parameters.shadowSource].width
      )
      _.globalAlpha = 1
      _.drawImage(
        images[parameters.trunkSource],
        (x + 0.1) * tileSize,
        (y + 0.8) * tileSize - trunkHeight,
        trunkScale,
        trunkHeight
      )
      _.drawImage(
        images[parameters.leavesSource],
        (x - 0.2) * tileSize,
        (y + 0.1) * tileSize - leavesHeight,
        leavesScale,
        leavesHeight
      )
    }
  },
}

const rock = {
  create() {
    const source = randomArray([
      '/images/Objects/stone_object_01.png',
      '/images/Objects/stone_object_02.png',
      '/images/Objects/stone_object_03.png',
      '/images/Objects/stone_object_04.png',
      '/images/Objects/stone_object_05.png',
      '/images/Objects/stone_object_06.png',
      '/images/Objects/stone_object_07.png',
      '/images/Objects/stone_object_08.png',
      '/images/Objects/stone_object_09.png',
      '/images/Objects/stone_object_10.png',
    ])

    return {
      imageSources: [source],
      parameters: {
        source,
      },
    }
  },
  draw(_, images, tileSize, x, y, parameters) {
    const width = tileSize * 0.8
    const height = width * images[parameters.source].height / images[parameters.source].width

    _.drawImage(
      images[parameters.source],
      (x + 0.1) * tileSize,
      (y + 0.9) * tileSize - height,
      width,
      height
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
    normalTree: 0.9,
    rock: 0.1,
  },
  grass_02: {
    normalTree: 0.9,
    rock: 0.1,
  },
  paving_01: {},
  paving_02: {},
  sand_01: {},
  sand_02: {},
  snow_01: {},
  snow_02: {},
  lava_01: {},
}
