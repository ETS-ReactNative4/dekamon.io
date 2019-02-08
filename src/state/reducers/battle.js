function battle(state = null, action) {
  if (action.type === 'ENGAGE_BATTLE') {
    return {
      monstersGroup: action.payload,
      turn: 1,
    }
  }

  return state
}

export default battle
