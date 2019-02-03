import gameConfiguration from '../gameConfiguration'
import computeHeroPath from '../computeHeroPath'
import draw from './draw'
import store from '../../state/store'

function registerCanvas(canvasElement, dispatch) {


  const _ = canvasElement.getContext('2d')
  let tileSize

  // For debug purposes
  window.canvas = canvasElement
  window._ = _

  canvasElement.addEventListener('click', e => {
    const { currentMap, heroPosition } = store.getState()
    const rect = canvasElement.getBoundingClientRect()

    const borderWidth = window.getComputedStyle(canvasElement).getPropertyValue('border-width') // 10px
    const borderWidthInPixed = parseInt(borderWidth.slice(0, borderWidth.length - 2), 10) // Remove "px"

    const finalPosition = {
      x: Math.floor((e.clientX - rect.left - borderWidthInPixed) / tileSize),
      y: Math.floor((e.clientY - rect.top - borderWidthInPixed) / tileSize),
    }

    // Tile can be undefined as the canvas is larger than the drawned tiles for some reason
    const tile = currentMap.tiles[finalPosition.y] && currentMap.tiles[finalPosition.y][finalPosition.x]

    if (tile && !tile.blocked) {
      dispatch({
        type: 'SET_HERO_FINAL_POSITION',
        payload: {
          finalPosition,
          path: computeHeroPath(heroPosition.position, finalPosition, currentMap),
        },
      })
    }

  })

  return (width, height) => {
    const tileSize1 = width / gameConfiguration.worldWidth
    const tileSize2 = height / gameConfiguration.worldHeight

    tileSize = Math.min(tileSize1, tileSize2)
    canvasElement.width = tileSize * gameConfiguration.worldWidth
    canvasElement.height = tileSize * gameConfiguration.worldHeight

    draw(_, tileSize)
  }
}


export default registerCanvas
