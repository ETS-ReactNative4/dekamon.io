function worldTileSize(state = 0, action) {
  switch (action.type) {
  case 'SET_WORLD_TILESIZE':
    return action.payload

  default:
    return state
  }
}

export default worldTileSize
