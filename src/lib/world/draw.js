import gameConfiguration from '../gameConfiguration'
import loadImages from './loadImages'

function draw(canvasElement, width, mapDefinition, hero, dispatch) {
  const tileSize = width / gameConfiguration.worldWidth
  const height = tileSize * gameConfiguration.worldHeight

  canvasElement.width = width
  canvasElement.height = height

  const _ = canvasElement.getContext('2d')

  _.clearRect(0, 0, width, height)

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
    const { x, y } = hero.position

    _.fillStyle = 'red'
    _.beginPath()
    _.arc((x + 0.5) * tileSize, (y + 0.5) * tileSize, tileSize * 0.3, 0, 2 * Math.PI)
    _.closePath()
    _.fill()
  })
  .catch(console.error)

  canvasElement.addEventListener('click', e => {
    const rect = canvasElement.getBoundingClientRect()

    dispatch({
      type: 'SET_HERO_FINAL_POSITION',
      payload: {
        finalPosition: {
          x: Math.floor((e.clientX - rect.left) / tileSize),
          y: Math.floor((e.clientY - rect.top) / tileSize),
        },
      },
    })
  })

}

export default draw
