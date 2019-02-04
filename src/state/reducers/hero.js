// {
//  position: x, y coordinates of the hero's current tile
//  destination: x, y coordinates of the hero's destination tile
//  canvasDiffPosition: dx, dy position of the hero on the canvas
//  path: array of x, y coordinates representing the path for position to destination
// }
function hero(state = {}, action) {
  switch (action.type) {

  case 'SET_HERO_POSITION':
  case 'SET_HERO_DESTINATION':
    return {
      ...state,
      ...action.payload,
    }

  case 'POP_HERO_POSITION': {
    const path = state.path.slice()
    const position = path.shift()

    return {
      ...state,
      path,
      position,
      canvasDiffPosition: {
        x: 0,
        y: 0,
      },
    }
  }

  default:
    return state
  }
}

export default hero
