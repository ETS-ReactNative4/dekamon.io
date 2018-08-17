import React from 'react'
import { connect } from 'react-redux'

class MapSection extends React.Component {

  render() {
    const { map } = this.props

    return (
      <div className="y8" style={{ margin: 16 }}>
        <div>{`[${map.position[0]},${map.position[1]}]`}</div>
        <div style={{ border: '1px solid grey', margin: 8 }}>
          {map.tiles.map((row, i) => (
            <div key={i} className="x4">
              {row.map((item, j) => (
                <div
                  key={j}
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: item ? 'grey' : 'white',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = s => ({
  map: s.currentMap,
})

export default connect(mapStateToProps)(MapSection)
