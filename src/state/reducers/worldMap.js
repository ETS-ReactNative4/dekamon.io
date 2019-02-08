function worldMap(state = null, action) {
  switch (action.type) {
  case 'SET_CURRENT_MAP':
  case 'CREATE_MAP':
    return action.payload

  default:
    return state
  }
}

export default worldMap
