import gameConfiguration from '../gameConfiguration'
import computeHeroPath from '../computeHeroPath'
import draw from './draw'

function registerCanvas(canvasElement, dispatch) {


  const _ = canvasElement.getContext('2d')
  let tileSize
  let mapDefinition
  let heroPosition

  // For debug purposes
  window.canvas = canvasElement
  window._ = _

  canvasElement.addEventListener('click', e => {
    const rect = canvasElement.getBoundingClientRect()

    const borderWidth = window.getComputedStyle(canvasElement).getPropertyValue('border-width') // 10px
    const borderWidthInPixed = parseInt(borderWidth.slice(0, borderWidth.length - 2), 10) // Remove "px"

    const finalPosition = {
      x: Math.floor((e.clientX - rect.left - borderWidthInPixed) / tileSize),
      y: Math.floor((e.clientY - rect.top - borderWidthInPixed) / tileSize),
    }

    // Tile can be undefined as the canvas is larger than the drawned tiles for some reason
    const tile = mapDefinition.tiles[finalPosition.y] && mapDefinition.tiles[finalPosition.y][finalPosition.x]

    if (tile && !tile.blocked) {
      dispatch({
        type: 'SET_HERO_FINAL_POSITION',
        payload: {
          finalPosition,
          path: computeHeroPath(heroPosition.position, finalPosition, mapDefinition),
        },
      })
    }

  })

  return (width, height, _mapDefinition, _heroPosition) => {
    const tileSize1 = width / gameConfiguration.worldWidth
    const tileSize2 = height / gameConfiguration.worldHeight

    tileSize = Math.min(tileSize1, tileSize2)
    mapDefinition = _mapDefinition
    heroPosition = _heroPosition
    canvasElement.width = tileSize * gameConfiguration.worldWidth
    canvasElement.height = tileSize * gameConfiguration.worldHeight

    draw(_, dispatch, tileSize, mapDefinition, heroPosition)
  }
}


export default registerCanvas
