function monstersInventory(state = [], action) {

  switch (action.type) {

  case 'PLACE_MONSTER_IN_INVENTORY':
    return [...state, action.payload]

  default:
    return state
  }
}

export default monstersInventory
