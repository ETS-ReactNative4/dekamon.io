import loadImages from './loadImages'
import { items } from './items'
import gameConfiguration from '../gameConfiguration'

let heroX = 0
let heroY = 0
let heroTimeout
let lastFinalPosition
let lastPosition
let heroIsLookingLeft = false
let useHeroImage1 = true
let useHeroImage1Counter = 0
const heroImage1Source = '/images/hero_1.png'
const heroImage2Source = '/images/hero_2.png'

function draw(_, dispatch, tileSize, mapDefinition, heroPosition) {
  _.clearRect(0, 0, tileSize * gameConfiguration.worldWidth, tileSize * gameConfiguration.worldHeight)

  const imageSourcesToLoad = [
    heroImage1Source,
    heroImage2Source,
  ]

  mapDefinition.tiles.forEach(row => {
    row.forEach(tile => {
      imageSourcesToLoad.push(tile.backgroundImageSource)

      if (tile.item) imageSourcesToLoad.push(...tile.item.imageSources)
    })
  })

  loadImages(imageSourcesToLoad)
  .then(images => {

    // Draw background
    mapDefinition.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        _.drawImage(images[tile.backgroundImageSource], i * tileSize, j * tileSize, tileSize, tileSize)
        // _.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize)
      })
    })

    // Draw hero
    const { position, finalPosition, path } = heroPosition

    const heroIsAtFinalPosition = position.x === finalPosition.x && position.y === finalPosition.y

    if (lastPosition !== position) {
      lastPosition = position
      clearTimeout(heroTimeout)
    }

    if (lastFinalPosition !== finalPosition) {
      lastFinalPosition = finalPosition
      clearTimeout(heroTimeout)
    }

    if (heroIsAtFinalPosition) {
      heroX = position.x * tileSize
      heroY = position.y * tileSize
      useHeroImage1 = true
      useHeroImage1Counter = 0
    }
    else {
      const nextPosition = path[0]
      const diffX = nextPosition.x * tileSize - heroX
      const diffY = nextPosition.y * tileSize - heroY

      if (diffX) heroIsLookingLeft = diffX < 0

      // if hero is close to nextPosition
      if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
        heroX = nextPosition.x * tileSize
        heroY = nextPosition.y * tileSize

        dispatch({ type: 'POP_HERO_POSITION' })
      }
      else {
        useHeroImage1Counter++

        if (!(useHeroImage1Counter % 10)) useHeroImage1 = !useHeroImage1

        const increment = tileSize / 20

        heroX += diffX === 0 ? 0 : diffX > 0 ? increment : -increment
        heroY += diffY === 0 ? 0 : diffY > 0 ? increment : -increment

        heroTimeout = setTimeout(() => draw(_, dispatch, tileSize, mapDefinition, heroPosition), 10)
      }
    }

    _.save()

    if (!heroIsLookingLeft) _.scale(-1, 1)

    const heroImage = images[useHeroImage1 ? heroImage1Source : heroImage2Source]

    _.drawImage(
      heroImage,
      heroIsLookingLeft ? heroX + tileSize * 0.15 : -heroX - 0.85 * tileSize,
      heroY - tileSize * 0.2,
      tileSize * 0.6,
      tileSize * heroImage.height / heroImage.width * 0.6
    )

    _.restore()

    // Draw items
    mapDefinition.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        if (tile.item) items[tile.item.name].draw(_, images, tileSize, i, j, tile.item.parameters)
      })
    })

  })
  .catch(console.error)
}

export default draw
