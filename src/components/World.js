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
    const { currentMap, hero } = this.props
    const heroIsOnARoad = currentMap.tiles[hero.position.y][hero.position.x].road

    return (
      <div ref={this.containerRef} className="World x5">
        <canvas
          ref={this.canvasRef}
          className="World-canvas"
          style={{ animation: heroIsOnARoad ? 'none' : 'World-border-pulsate 2s infinite' }}
        />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  currentMap: s.currentMap,
  hero: s.hero,
})

export default connect(mapStateToProps)(World)
