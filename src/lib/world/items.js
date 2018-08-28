import { randomArray } from '../utils'

export function normalTree() {
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

  return {
    imageSources: [leavesSource, trunkSource, shadowSource],
    draw(_, images, tileSize, x, y) {
      _.globalAlpha = 0.5
      _.drawImage(images[shadowSource], (x - 0.15) * tileSize, (y + 0.1) * tileSize, tileSize * 1.3, tileSize * 1.3)
      _.globalAlpha = 1
      _.drawImage(images[trunkSource], (x + 0.15) * tileSize, (y + 0.15) * tileSize, tileSize * 0.7, tileSize * 0.7)
      _.drawImage(images[leavesSource], (x - 0.065) * tileSize, (y - 0.8) * tileSize, tileSize * 1.2, tileSize * 1.2)
    },
  }
}

export function palmTree() {

}

export function pineTree() {

}
