function programons(state = [], action) {

  switch (action.type) {

  case 'CREATE_PROGRAMON':
    return [...state, action.payload]

  default:
    return state
  }
}

export default programons
