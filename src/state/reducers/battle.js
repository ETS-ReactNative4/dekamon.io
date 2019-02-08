function battle(state = null, action) {
  switch (action.type) {
  case 'SET_BATTLE':
    return action.payload

  case 'END_BATTLE':
    return null

  default:
    return state
  }
}

export default battle
