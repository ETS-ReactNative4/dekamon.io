const memory = {}

const hash = position => {
  const h = `${position.x}_${position.y}`

  memory[h] = position

  return h
}

const unhash = hash => memory[hash]

const getTileWeight = tile => tile.blocked ? Infinity : tile.road ? 1 : 10

const manhattanHeuristic = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y)

// http://theory.stanford.edu/~amitp/GameProgramming/ImplementationNotes.html
function computeHeroPath(startPosition, goalPosition, mapDefinition) {

  const startPositionHash = hash(startPosition)
  const goalPositionHash = hash(goalPosition)

  const open = [startPositionHash]
  const closed = []
  const hashToRank = {}
  const hashToCost = {}
  const hashToParent = {}

  hashToRank[startPositionHash] = 0
  hashToCost[startPositionHash] = 0

  while (true) {

    // current = remove lowest rank item from OPEN
    let minRank = Infinity
    let currentPositionHash = null
    let currentPositionIndexInOpen = null

    open.forEach((hash, index) => {
      const rank = hashToRank[hash]

      if (rank < minRank) {
        minRank = rank
        currentPositionHash = hash
        currentPositionIndexInOpen = index
      }
    })

    const currentPosition = unhash(currentPositionHash)

    open.splice(currentPositionIndexInOpen, 1)

    // while lowest rank in OPEN is not the GOAL
    if (currentPositionHash === goalPositionHash) {
      break
    }

    // add current to CLOSED
    closed.push(currentPositionHash)

    // for neighbors of current:
    const { x, y } = currentPosition
    const neighbors = []

    if (mapDefinition.tiles[y][x - 1]) neighbors.push({ x: x - 1, y })
    if (mapDefinition.tiles[y][x + 1]) neighbors.push({ x: x + 1, y })
    if (mapDefinition.tiles[y - 1]) neighbors.push({ x, y: y - 1 })
    if (mapDefinition.tiles[y + 1]) neighbors.push({ x, y: y + 1 })

    neighbors.forEach(neighborPosition => {
      const neighborHash = hash(neighborPosition)

      // cost = g(current) + movementcost(current, neighbor)
      const cost = hashToCost[currentPositionHash] + getTileWeight(mapDefinition.tiles[neighborPosition.y][neighborPosition.x])

      const neighborIndexInOpen = open.indexOf(neighborHash)
      const neighborIndexInClosed = closed.indexOf(neighborHash)

      // if neighbor in OPEN and cost less than g(neighbor):
      if (neighborIndexInOpen !== -1 && cost < hashToCost[neighborHash]) {
        // remove neighbor from OPEN, because new path is better
        open.splice(neighborIndexInOpen, 1)
      }

      // if neighbor in CLOSED and cost less than g(neighbor):
      // This should never happen if you have an consistent admissible heuristic.
      if (neighborIndexInClosed !== -1 && cost < hashToCost[neighborHash]) {
        closed.splice(neighborIndexInClosed, 1)
      }
      // if neighbor not in OPEN and neighbor not in CLOSED:
      if (neighborIndexInOpen === -1 && neighborIndexInClosed === -1) {
        // set g(neighbor) to cost
        hashToCost[neighborHash] = cost
        // set priority queue rank to g(neighbor) + h(neighbor)
        hashToRank[neighborHash] = cost + manhattanHeuristic(neighborPosition, goalPosition)
        // set neighbor's parent to current
        hashToParent[neighborHash] = currentPosition
        // add neighbor to OPEN
        open.push(neighborHash)
      }
    })
  }

  const path = []

  path.push(goalPosition)

  let currentPositionHash = hash(goalPosition)

  while (currentPositionHash !== startPositionHash) {
    const parent = hashToParent[currentPositionHash]

    path.unshift(parent)

    currentPositionHash = hash(parent)
  }

  return path
}

export default computeHeroPath
