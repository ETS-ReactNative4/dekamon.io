import React from 'react'
import { connect } from 'react-redux'
import registerCanvas from '../lib/world/registerCanvas'
import './World.css'

class World extends React.Component {

  containerRef = React.createRef()

  canvasRef = React.createRef()

  componentDidMount() {
    const { dispatch } = this.props

    this.updateCanvasParameters = registerCanvas(this.canvasRef.current, dispatch)

    window.addEventListener('resize', this.updateCanvas)

    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas = () => {
    const { clientWidth, clientHeight } = this.containerRef.current

    this.updateCanvasParameters(clientWidth, clientHeight)
  }

  render() {
    const { currentMap, heroPosition } = this.props
    const heroIsOnARoad = currentMap.tiles[heroPosition.position.y][heroPosition.position.x].road

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
  heroPosition: s.heroPosition,
})

export default connect(mapStateToProps)(World)
