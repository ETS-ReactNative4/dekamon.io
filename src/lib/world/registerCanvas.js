import gameConfiguration from '../gameConfiguration'
import computeHeroPath from '../computeHeroPath'
import draw from './draw'

function registerCanvas(canvasElement, dispatch) {

  const _ = canvasElement.getContext('2d')
  let tileSize
  let mapDefinition
  let heroPosition

  canvasElement.addEventListener('click', e => {
    const rect = canvasElement.getBoundingClientRect()

    const finalPosition = {
      x: Math.floor((e.clientX - rect.left) / tileSize),
      y: Math.floor((e.clientY - rect.top) / tileSize),
    }

    dispatch({
      type: 'SET_HERO_FINAL_POSITION',
      payload: {
        finalPosition,
        path: computeHeroPath(heroPosition.position, finalPosition, mapDefinition),
      },
    })
  })

  return (width, _mapDefinition, _heroPosition) => {
    tileSize = width / gameConfiguration.worldWidth
    mapDefinition = _mapDefinition
    heroPosition = _heroPosition
    canvasElement.width = width
    canvasElement.height = tileSize * gameConfiguration.worldHeight

    draw(_, tileSize, mapDefinition, heroPosition)
  }
}


export default registerCanvas
