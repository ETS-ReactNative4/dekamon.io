function hero(state = null, action) {
  switch (action.type) {
  case 'CREATE_HERO':
    return {
      ...action.payload,
      life: 100,
      mana: 100,
      strength: 10,
      vitality: 10,
      defense: 10,
      magic: 10,
    }

  default:
    return state
  }
}

export default hero
