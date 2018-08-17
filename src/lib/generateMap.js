/* eslint-disable prefer-destructuring */
import { chance, randomRange, randomArray } from './math'
import gameConfiguration from './gameConfiguration'

const width = gameConfiguration.mapWidth
const height = gameConfiguration.mapHeight

function computeDistance(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
  // return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
}

function generateMap(entries = {}) {
  const tiles = []

  for (let j = 0; j < height; j++) {
    const row = []

    for (let i = 0; i < width; i++) {
      row.push(0)
    }

    tiles.push(row)
  }

  if (typeof entries.north === 'undefined' && chance(0.6)) entries.north = randomRange(2, width - 3)
  if (typeof entries.south === 'undefined' && chance(0.6)) entries.south = randomRange(2, width - 3)
  if (typeof entries.west === 'undefined' && chance(0.6)) entries.west = randomRange(2, height - 3)
  if (typeof entries.east === 'undefined' && chance(0.6)) entries.east = randomRange(2, height - 3)

  let groups = []

  if (entries.north) {
    const northGroup = []
    const offset = randomRange(2, 7)

    for (let i = 0; i < offset; i++) {
      northGroup.push({ x: entries.north, y: i })
    }

    groups.push(northGroup)
  }
  if (entries.south) {
    const southGroup = []
    const offset = randomRange(2, 7)

    for (let i = 0; i < offset; i++) {
      southGroup.push({ x: entries.south, y: height - i - 1 })
    }

    groups.push(southGroup)
  }
  if (entries.west) {
    const westGroup = []
    const offset = randomRange(2, 7)

    for (let i = 0; i < offset; i++) {
      westGroup.push({ x: i, y: entries.west })
    }

    groups.push(westGroup)
  }
  if (entries.east) {
    const eastGroup = []
    const offset = randomRange(2, 7)

    for (let i = 0; i < offset; i++) {
      eastGroup.push({ x: width - i - 1, y: entries.east })
    }

    groups.push(eastGroup)
  }

  const nIsolatedPoints = randomRange(0, 2)

  for (let i = 0; i < nIsolatedPoints; i++) {
    groups.push([{ x: randomRange(3, width - 4), y: randomRange(3, height - 4) }])
  }

  if (groups.length === 1) {
    groups.push([{ x: randomRange(3, width - 4), y: randomRange(3, height - 4) }])
  }

  while (groups.length > 1) {
    // Pop 2 groups at random
    const [g1] = groups.splice(randomRange(0, groups.length - 1), 1)
    const [g2] = groups.splice(randomRange(0, groups.length - 1), 1)

    // Find closest points between the 2 groups
    let point1
    let point2
    let minScore = Infinity

    g1.forEach(p1 => {
      g2.forEach(p2 => {
        const score = computeDistance(p1, p2)

        if (score < minScore) {
          point1 = p1
          point2 = p2
          minScore = score
        }
      })
    })

    // Merge the 2 groups
    const g3 = [...g1, ...g2]

    // Join point1 and point2 with a path
    if (chance(0.5)) {
      // Start with x direction
      let diff = point2.x - point1.x
      let signOfDiff = diff / Math.abs(diff)
      let i

      for (i = point1.x; signOfDiff > 0 ? i < point2.x : i > point2.x; i += signOfDiff) {
        g3.push({ x: i, y: point1.y })
      }

      diff = point2.y - point1.y
      signOfDiff = diff / Math.abs(diff)

      for (let j = point1.y; signOfDiff > 0 ? j < point2.y : j > point2.y; j += signOfDiff) {
        g3.push({ x: i, y: j })
      }
    }
    else {
      // Start with y-direction
      let diff = point2.y - point1.y
      let signOfDiff = diff / Math.abs(diff)
      let i

      for (i = point1.y; signOfDiff > 0 ? i < point2.y : i > point2.y; i += signOfDiff) {
        g3.push({ x: point1.x, y: i })
      }

      diff = point2.x - point1.x
      signOfDiff = diff / Math.abs(diff)

      for (let j = point1.x; signOfDiff > 0 ? j < point2.x : j > point2.x; j += signOfDiff) {
        g3.push({ x: j, y: i })
      }

    }
    // Add g3 to groups
    groups.push(g3)

    // Merge touching groups
    const groupsToMerge = []

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]

      for (let j = i + 1; j < groups.length; j++) {
        const otherGroup = groups[j]

        const shouldMergeGroups = group.some(p1 => otherGroup.some(p2 => (
          (p1.x === p2.x && p1.y === p2.y)
          || (p1.x + 1 === p2.x && p1.y === p2.y)
          || (p1.x - 1 === p2.x && p1.y === p2.y)
          || (p1.x === p2.x && p1.y + 1 === p2.y)
          || (p1.x === p2.x && p1.y - 1 === p2.y)
        )))

        if (shouldMergeGroups) {
          groupsToMerge.push([i, j])
        }
      }
    }

    groupsToMerge.forEach(([i, j]) => {
      groups[i].push(...groups[j])
      groups[j] = groups[i]
    })

    const nextGroups = []

    groups.forEach(group => {
      if (!nextGroups.includes(group)) nextGroups.push(group)
    })

    groups = nextGroups
  }

  groups.forEach(group => {
    group.forEach(p => {
      tiles[p.y][p.x] = 1
    })
  })

  return {
    entries,
    tiles,
  }

}
// function generateMap(entries = {}) {
//   const tiles = []
//
//   for (let j = 0; j < height; j++) {
//     const row = []
//
//     for (let i = 0; i < width; i++) {
//       row.push(false)
//     }
//
//     tiles.push(row)
//   }
//
//   if (typeof entries.north === 'undefined' && chance(0.6)) entries.north = randomRange(2, width - 3)
//   if (typeof entries.south === 'undefined' && chance(0.6)) entries.south = randomRange(2, width - 3)
//   if (typeof entries.west === 'undefined' && chance(0.6)) entries.west = randomRange(2, height - 3)
//   if (typeof entries.east === 'undefined' && chance(0.6)) entries.east = randomRange(2, height - 3)
//
//   const pathPoints = []
//   const pointsToJoin = []
//
//
//   if (entries.north) {
//     const offset = randomRange(2, 7)
//     let i
//     for (i = 0; i < offset; i++) {
//       pathPoints.push([entries.north, i])
//     }
//     i--
//
//     pointsToJoin.push([entries.north, i])
//   }
//   if (entries.south) {
//     const offset = randomRange(2, 7)
//     let i
//     for (i = 0; i < offset; i++) {
//       pathPoints.push([entries.south, height - i - 1])
//     }
//     i--
//
//     pointsToJoin.push([entries.south, height - i - 1])
//   }
//   if (entries.west) {
//     const offset = randomRange(2, 7)
//     let i
//     for (i = 0; i < offset; i++) {
//       pathPoints.push([i, entries.west])
//     }
//     i--
//
//     pointsToJoin.push([i, entries.west])
//   }
//   if (entries.east) {
//     const offset = randomRange(2, 7)
//     let i
//     for (i = 0; i < offset; i++) {
//       pathPoints.push([width - i - 1, entries.east])
//     }
//     i--
//
//     pointsToJoin.push([width - i - 1, entries.east])
//   }
//
//   while (pointsToJoin.length >= 2) {
//     const p1 = pointsToJoin.shift()
//     const p2 = pointsToJoin.shift()
//
//     const firstDirection = chance(0.5) ? 'x' : 'y'
//
//     const currentPathPoints = []
//
//     if (firstDirection === 'x') {
//       let diff = p2[0] - p1[0]
//       let signOfDiff = diff / Math.abs(diff)
//       let i
//
//       for (i = p1[0]; signOfDiff > 0 ? i < p2[0] : i > p2[0]; i += signOfDiff) {
//         currentPathPoints.push([i, p1[1]])
//       }
//
//       diff = p2[1] - p1[1]
//       signOfDiff = diff / Math.abs(diff)
//
//       for (let j = p1[1]; signOfDiff > 0 ? j < p2[1] : j > p2[1]; j += signOfDiff) {
//         currentPathPoints.push([i, j])
//       }
//     }
//     else {
//       let diff = p2[1] - p1[1]
//       let signOfDiff = diff / Math.abs(diff)
//       let i
//
//       for (i = p1[1]; signOfDiff > 0 ? i < p2[1] : i > p2[1]; i += signOfDiff) {
//         currentPathPoints.push([p1[0], i])
//       }
//
//       diff = p2[0] - p1[0]
//       signOfDiff = diff / Math.abs(diff)
//
//       for (let j = p1[0]; signOfDiff > 0 ? j < p2[0] : j > p2[0]; j += signOfDiff) {
//         currentPathPoints.push([j, i])
//       }
//
//     }
//     pointsToJoin.push(randomArray(currentPathPoints))
//     pathPoints.push(...currentPathPoints)
//   }
//
//   pathPoints.forEach(p => {
//     // console.log(p)
//     tiles[p[1]][p[0]] = true
//   })
//
//   return {
//     entries,
//     tiles,
//   }
// }

export default generateMap
