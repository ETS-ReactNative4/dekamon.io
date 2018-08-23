import loadImages from './loadImages'
import gameConfiguration from '../gameConfiguration'

function draw(_, tileSize, mapDefinition, heroPosition) {
  _.clearRect(0, 0, tileSize * gameConfiguration.worldWidth, tileSize * gameConfiguration.worldHeight)

  const imageSourcesToLoad = []

  mapDefinition.tiles.forEach(row => {
    row.forEach(tile => {
      if (tile) {
        imageSourcesToLoad.push(tile.backgroundImageSource)
      }
    })
  })

  loadImages(imageSourcesToLoad)
  .then(images => {
    // draw background
    mapDefinition.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        if (tile) {
          _.drawImage(images[tile.backgroundImageSource], i * tileSize, j * tileSize, tileSize, tileSize)
        }
      })
    })

    // draw hero
    const { position, finalPosition, path } = heroPosition

    _.fillStyle = 'red'
    _.beginPath()
    _.arc((position.x + 0.5) * tileSize, (position.y + 0.5) * tileSize, tileSize * 0.3, 0, 2 * Math.PI)
    _.closePath()
    _.fill()

    if (path) {
      path.forEach((position, i) => {
        if (i) {
          _.fillStyle = 'green'
          _.beginPath()
          _.arc((position.x + 0.5) * tileSize, (position.y + 0.5) * tileSize, tileSize * 0.3, 0, 2 * Math.PI)
          _.closePath()
          _.fill()
        }
      })
    }

    if (finalPosition) {
      _.strokeStyle = 'green'
      _.lineWidth = 5
      _.strokeRect(finalPosition.x * tileSize, finalPosition.y * tileSize, tileSize, tileSize)
    }

  })
  .catch(console.error)
}

export default draw
