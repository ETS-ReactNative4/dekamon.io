import generateHeroPath from './generateHeroPath'
import draw from './draw'
import store from '../../state/store'

// A function called once for registering the canvas event listeners
function registerCanvas(canvas) {
  const _ = canvas.getContext('2d')

  // For debug purposes
  // window.canvas = canvas
  // window._ = _

  canvas.addEventListener('click', e => {
    const { tileSize, currentMap, hero: { position } } = store.getState()
    const rect = canvas.getBoundingClientRect()

    const borderWidth = window.getComputedStyle(canvas).getPropertyValue('border-width') // 10px
    const borderWidthInPixed = parseInt(borderWidth.slice(0, borderWidth.length - 2), 10) // Remove "px"

    const destination = {
      x: Math.floor((e.clientX - rect.left - borderWidthInPixed) / tileSize),
      y: Math.floor((e.clientY - rect.top - borderWidthInPixed) / tileSize),
    }

    const heroIsAtDestination = position.x === destination.x && position.y === destination.y
    // Tile can be undefined as the canvas is larger than the drawned tiles for some reason
    const tile = currentMap.tiles[destination.y] && currentMap.tiles[destination.y][destination.x]

    if (tile && !tile.blocked && !heroIsAtDestination) {
      const path = generateHeroPath(position, destination, currentMap)

      store.dispatch({
        type: 'SET_HERO_DESTINATION',
        payload: {
          destination,
          path,
          nextPosition: path[0],
        },
      })
    }
  })

  // canvas.addEventListener('mousemove', e => {
  //   console.log(e)
  // })

  let requestId

  // Cancel previous draw
  cancelAnimationFrame(requestId)

  // Draw the canvas
  const drawStep = () => {
    draw(_)
    requestId = requestAnimationFrame(drawStep)
  }

  requestId = requestAnimationFrame(drawStep)
}


export default registerCanvas
