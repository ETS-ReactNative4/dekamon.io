import React from 'react'
import { connect } from 'react-redux'
import generateWorldMap from '../lib/generateWorldMap'

class PositionButtons extends React.Component {

  handleWalkClick(entry) {
    const { currentMap, maps, dispatch } = this.props

    let x = currentMap.position[0]
    let y = currentMap.position[1]

    if (entry === 'north') y--
    if (entry === 'south') y++
    if (entry === 'west') x--
    if (entry === 'east') x++

    const nextMap = maps.find(map => map.position[0] === x && map.position[1] === y)

    if (nextMap) {
      dispatch({ type: 'SET_CURRENT_MAP', payload: nextMap })
    }
    else {
      const entries = {}

      const northMap = maps.find(map => map.position[0] === x && map.position[1] === y - 1)
      const southMap = maps.find(map => map.position[0] === x && map.position[1] === y + 1)
      const westMap = maps.find(map => map.position[0] === x - 1 && map.position[1] === y)
      const eastMap = maps.find(map => map.position[0] === x + 1 && map.position[1] === y)

      if (northMap) entries.north = northMap.entries.south || null
      if (southMap) entries.south = southMap.entries.north || null
      if (westMap) entries.west = westMap.entries.east || null
      if (eastMap) entries.east = eastMap.entries.west || null

      dispatch({
        type: 'CREATE_MAP',
        payload: {
          position: [x, y],
          ...generateWorldMap(entries),
        },
      })
    }
  }

  render() {
    const { currentMap } = this.props

    return (
      <div className="y8 no-select">
        <button
          type="button"
          onClick={() => this.handleWalkClick('north')}
          disabled={!currentMap.entries.north}
        >
          North
        </button>
        <div className="x5">
          <button
            type="button"
            onClick={() => this.handleWalkClick('west')}
            disabled={!currentMap.entries.west}
          >
            West
          </button>
          <div style={{ margin: 16 }}>
            walk
          </div>
          <button
            type="button"
            onClick={() => this.handleWalkClick('east')}
            disabled={!currentMap.entries.east}
          >
            East
          </button>
        </div>
        <button
          type="button"
          onClick={() => this.handleWalkClick('south')}
          disabled={!currentMap.entries.south}
        >
          South
        </button>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  maps: s.maps,
  currentMap: s.currentMap,
})

export default connect(mapStateToProps)(PositionButtons)
