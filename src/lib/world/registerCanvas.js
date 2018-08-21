import gameConfiguration from '../gameConfiguration'
import computeHeroPath from '../computeHeroPath'
import draw from './draw'

let registeredEvents = false

function registerCanvas(canvasElement, width, mapDefinition, heroPosition, dispatch) {
  const tileSize = width / gameConfiguration.worldWidth
  const height = tileSize * gameConfiguration.worldHeight

  canvasElement.width = width
  canvasElement.height = height

  const _ = canvasElement.getContext('2d')

  if (!registeredEvents) {
    registeredEvents = true

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
  }

  draw(_, width, height, tileSize, mapDefinition, heroPosition)
}


export default registerCanvas
