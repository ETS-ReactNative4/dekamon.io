function battleTileSize(state = 0, action) {
  switch (action.type) {
  case 'SET_BATTLE_TILESIZE':
    return action.payload

  default:
    return state
  }
}

export default battleTileSize
