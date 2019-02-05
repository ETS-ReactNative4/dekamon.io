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
    return (
      <div ref={this.containerRef} className="World x5">
        <canvas
          ref={this.canvasRef}
          className="World-canvas no-select"
        />
      </div>
    )
  }
}

export default connect()(World)
