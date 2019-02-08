import store from '../../state/store'
import registerCanvasFactory from '../registerCanvasFactory'
import generateHeroPath from './generateHeroPath'
import draw from './draw'

const eventListeners = [
  ['click', (e, canvas) => {
    const { worldTileSize, worldMap, hero: { position } } = store.getState()
    const rect = canvas.getBoundingClientRect()

    const borderWidth = window.getComputedStyle(canvas).getPropertyValue('border-width') // 10px
    const borderWidthInPixed = parseInt(borderWidth.slice(0, borderWidth.length - 2), 10) // Remove "px"

    const destination = {
      x: Math.floor((e.clientX - rect.left - borderWidthInPixed) / worldTileSize),
      y: Math.floor((e.clientY - rect.top - borderWidthInPixed) / worldTileSize),
    }

    const heroIsAtDestination = position.x === destination.x && position.y === destination.y
    // Tile can be undefined as the canvas is larger than the drawned tiles for some reason
    const tile = worldMap.tiles[destination.y] && worldMap.tiles[destination.y][destination.x]

    if (tile && !tile.blocked && !heroIsAtDestination) {
      const path = generateHeroPath(position, destination, worldMap)

      store.dispatch({
        type: 'SET_HERO_DESTINATION',
        payload: {
          destination,
          path,
          nextPosition: path[0],
        },
      })
    }
  }],
]

export default registerCanvasFactory(eventListeners, draw)
