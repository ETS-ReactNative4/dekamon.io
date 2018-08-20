function hero(state = {}, action) {
  switch (action.type) {

  case 'SET_HERO_POSITION':
  case 'SET_HERO_FINAL_POSITION':
    return {
      ...state,
      ...action.payload,
    }

  default:
    return state
  }
}

export default hero
