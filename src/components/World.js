import React from 'react'
import { connect } from 'react-redux'
import registerCanvas from '../lib/world/registerCanvas'
import gameConfiguration from '../lib/gameConfiguration'
import './World.css'

class World extends React.Component {

  containerRef = React.createRef()

  canvasRef = React.createRef()

  componentDidMount() {
    window.addEventListener('resize', this.updateTileSize)

    this.updateTileSize()

    this.unregisterCanvas = registerCanvas(this.canvasRef.current)
  }

  componentWillUnmount() {
    this.unregisterCanvas()
  }

  updateTileSize = () => {
    const { dispatch } = this.props
    const { clientWidth, clientHeight } = this.containerRef.current

    const worldTileSize1 = clientWidth / gameConfiguration.worldWidth
    const worldTileSize2 = clientHeight / gameConfiguration.worldHeight
    const worldTileSize = Math.min(worldTileSize1, worldTileSize2)

    dispatch({
      type: 'SET_WORLD_TILESIZE',
      payload: worldTileSize,
    })
  }

  render() {
    const { worldMap } = this.props

    return (
      <div ref={this.containerRef} className="World relative x5">
        <div className="World-position">
          {worldMap.position.x} {worldMap.position.y}
          <br />
          {JSON.stringify(worldMap.monstersGroups.map(mg => `${mg.position.x} ${mg.position.y}`))}
        </div>
        <canvas
          ref={this.canvasRef}
          className="World-canvas no-select"
        />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  worldMap: s.worldMap,
})

export default connect(mapStateToProps)(World)
