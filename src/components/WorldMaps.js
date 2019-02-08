import React from 'react'
import { connect } from 'react-redux'
import gameConfiguration from '../lib/gameConfiguration'

const cellSize = 5

class WorldMaps extends React.Component {

  renderMapSection(x, y) {
    const { worldMaps } = this.props

    const map = worldMaps.find(map => map.position.x === x && map.position.y === y)

    const divStyle = {
      borderBottom: '1px solid lightgrey',
      borderRight: '1px solid lightgrey',
      width: gameConfiguration.worldWidth * cellSize,
      height: gameConfiguration.worldHeight * cellSize,
    }

    if (!map) {
      return (
        <div style={{ ...divStyle, backgroundColor: 'lightgrey' }} title={`[${x},${y}]`} />
      )
    }

    return (
      <div style={divStyle} title={`[${x},${y}]`}>
        {map.tiles.map((row, i) => (
          <div key={i} className="x4">
            {row.map((tile, j) => (
              <div
                key={j}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: tile.road ? 'grey' : 'white',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { worldMap, close } = this.props
    const divs = []

    for (let j = 0; j < 5; j++) {
      const row = []

      for (let i = 0; i < 5; i++) {
        row.push(
          <div key={i}>
            {this.renderMapSection(i - 2 + worldMap.position.x, j - 2 + worldMap.position.y)}
          </div>
        )
      }

      divs.push(
        <div className="x4" key={j}>
          {row}
        </div>
      )
    }

    return (
      <div
        style={{
          position: 'relative',
          padding: 32,
          backgroundColor: 'white',
        }}
      >
        <div
          onClick={close}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            cursor: 'pointer',
          }}
        >
          ×
        </div>
        <div
          style={{
            borderTop: '1px solid lightgrey',
            borderLeft: '1px solid lightgrey',
          }}
        >
          {divs}
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  worldMaps: s.worldMaps,
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(WorldMaps)
