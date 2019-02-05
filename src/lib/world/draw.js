import loadImages from './loadImages'
import { items } from './items'
import gameConfiguration from '../gameConfiguration'
import store from '../../state/store'

let heroIsLookingLeft = false
const heroImage1Source = '/images/hero_1.png'
const heroImage2Source = '/images/hero_2.png'

function draw(_) {
  const { tileSize, currentMap, hero: { position, destination, canvasOffset } } = store.getState()

  _.canvas.width = tileSize * gameConfiguration.worldWidth
  _.canvas.height = tileSize * gameConfiguration.worldHeight

  _.clearRect(0, 0, tileSize * gameConfiguration.worldWidth, tileSize * gameConfiguration.worldHeight)

  const imageSourcesToLoad = [
    heroImage1Source,
    heroImage2Source,
  ]

  // Set images to load
  currentMap.tiles.forEach(row => {
    row.forEach(tile => {
      imageSourcesToLoad.push(tile.backgroundImageSource)

      if (tile.item) imageSourcesToLoad.push(...tile.item.imageSources)
    })
  })

  return loadImages(imageSourcesToLoad)
  .then(images => {

    // Draw background
    currentMap.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        _.drawImage(images[tile.backgroundImageSource], i * tileSize, j * tileSize, tileSize, tileSize)
        // _.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize)
      })
    })

    // Draw items
    currentMap.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        if (tile.item) items[tile.item.name].draw(_, images, tileSize, i, j, tile.item.parameters)
      })

      // Draw hero at correct position
      // So items don't overflow him
      if (j === position.y) {
        _.save()

        const useHeroImage1 =
          canvasOffset.x + canvasOffset.y === 0 || // Use second image only when moving
          ((destination.x + destination.y) - (position.x + position.y)) % 2 === 0

        heroIsLookingLeft = destination.x === position.x ? heroIsLookingLeft : destination.x < position.x

        if (!heroIsLookingLeft) _.scale(-1, 1)

        const heroImage = images[useHeroImage1 ? heroImage1Source : heroImage2Source]

        _.drawImage(
          heroImage,
          heroIsLookingLeft ? tileSize * (position.x + canvasOffset.x + 0.15) : -tileSize * (position.x + canvasOffset.x + 0.85),
          tileSize * (position.y + canvasOffset.y - 0.2),
          tileSize * 0.6,
          tileSize * heroImage.height / heroImage.width * 0.6
        )

        _.restore()
      }
    })

  })
  .catch(console.error)
}

export default draw
