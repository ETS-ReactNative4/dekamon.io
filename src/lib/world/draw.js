import loadImages from './loadImages'
import gameConfiguration from '../gameConfiguration'

let heroX = 0
let heroY = 0
let heroTimeout
let lastFinalPosition
let lastPosition

function draw(_, dispatch, tileSize, mapDefinition, heroPosition) {
  _.clearRect(0, 0, tileSize * gameConfiguration.worldWidth, tileSize * gameConfiguration.worldHeight)

  const imageSourcesToLoad = []

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
      })
    })

    mapDefinition.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        if (tile.item) tile.item.draw(_, images, tileSize, i, j)
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
      heroX = (position.x + 0.5) * tileSize
      heroY = (position.y + 0.5) * tileSize
    }
    else {
      const nextPosition = path[0]
      const diffX = (nextPosition.x + 0.5) * tileSize - heroX
      const diffY = (nextPosition.y + 0.5) * tileSize - heroY
      // if hero is close to nextPosition
      if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
        heroX = (nextPosition.x + 0.5) * tileSize
        heroY = (nextPosition.y + 0.5) * tileSize

        dispatch({ type: 'POP_HERO_POSITION' })
      }
      else {
        const increment = tileSize / 20

        heroX += diffX === 0 ? 0 : diffX > 0 ? increment : -increment
        heroY += diffY === 0 ? 0 : diffY > 0 ? increment : -increment

        heroTimeout = setTimeout(() => draw(_, dispatch, tileSize, mapDefinition, heroPosition), 10)
      }
    }

    _.fillStyle = 'red'
    _.beginPath()
    _.arc(heroX, heroY, tileSize * 0.3, 0, 2 * Math.PI)
    _.closePath()
    _.fill()
  })
  .catch(console.error)
}

export default draw
