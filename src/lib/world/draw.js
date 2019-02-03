import loadImages from './loadImages'
import { items } from './items'
import gameConfiguration from '../gameConfiguration'
import store from '../../state/store'

const heroImage1Source = '/images/hero_1.png'
const heroImage2Source = '/images/hero_2.png'

function draw(_) {
  const { tileSize, currentMap, hero } = store.getState()

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
      // if (j === position.y) {
      //   _.save()
      //
      //   if (!heroIsLookingLeft) _.scale(-1, 1)
      //
      //   const heroImage = images[useHeroImage1 ? heroImage1Source : heroImage2Source]
      //
      //   _.drawImage(
      //     heroImage,
      //     heroIsLookingLeft ? heroX + tileSize * 0.15 : -heroX - 0.85 * tileSize,
      //     heroY - tileSize * 0.2,
      //     tileSize * 0.6,
      //     tileSize * heroImage.height / heroImage.width * 0.6
      //   )
      //
      //   _.restore()
      // }
    })

  })
  .catch(console.error)
}

export default draw
