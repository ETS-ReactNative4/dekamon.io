import React from 'react'
import { connect } from 'react-redux'
import gameConfiguration from '../lib/gameConfiguration'

class GlobalMap extends React.Component {

  renderMapSection(x, y) {
    const { maps } = this.props

    const map = maps.find(map => map.position[0] === x && map.position[1] === y)

    const divStyle = {
      borderBottom: '1px solid lightgrey',
      borderRight: '1px solid lightgrey',
      width: gameConfiguration.mapWidth * 2,
      height: gameConfiguration.mapHeight * 2,
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
            {row.map((item, j) => (
              <div
                key={j}
                style={{
                  width: 2,
                  height: 2,
                  backgroundColor: item ? 'grey' : 'white',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { currentMap } = this.props
    const divs = []

    for (let j = 0; j < 5; j++) {
      const row = []

      for (let i = 0; i < 5; i++) {
        row.push(
          <div key={i}>
            {this.renderMapSection(i - 2 + currentMap.position[0], j - 2 + currentMap.position[1])}
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
          margin: 16,
          borderTop: '1px solid lightgrey',
          borderLeft: '1px solid lightgrey',
        }}
      >
        {divs}
      </div>
    )
  }
}

const mapStateToProps = s => ({
  maps: s.maps,
  currentMap: s.currentMap,
})

export default connect(mapStateToProps)(GlobalMap)
