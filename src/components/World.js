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

    registerCanvas(this.canvasRef.current)
  }

  updateTileSize = () => {
    const { dispatch } = this.props
    const { clientWidth, clientHeight } = this.containerRef.current

    const tileSize1 = clientWidth / gameConfiguration.worldWidth
    const tileSize2 = clientHeight / gameConfiguration.worldHeight
    const tileSize = Math.min(tileSize1, tileSize2)

    dispatch({
      type: 'SET_TILESIZE',
      payload: tileSize,
    })
  }

  render() {
    const { position } = this.props

    return (
      <div ref={this.containerRef} className="World relative x5">
        <div className="World-position">
          {position.x} {position.y}
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
  position: s.currentMap.position,
})

export default connect(mapStateToProps)(World)
