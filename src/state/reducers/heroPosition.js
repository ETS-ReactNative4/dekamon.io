function hero(state = {}, action) {
  switch (action.type) {

  case 'SET_HERO_POSITION':
  case 'SET_HERO_FINAL_POSITION':
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
    }
  }

  default:
    return state
  }
}

export default hero
