function maps(state = [], action) {
  switch (action.type) {
  case 'CREATE_MAP':
    return [...state, action.payload]
  default:
    return state
  }
}

export default maps
