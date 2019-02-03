function tileSize(state = 0, action) {
  switch (action.type) {
  case 'SET_TILESIZE':
    return action.payload

  default:
    return state
  }
}

export default tileSize
