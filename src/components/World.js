import React from 'react'
import { connect } from 'react-redux'
import registerCanvas from '../lib/world/registerCanvas'

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
    const { currentMap, heroPosition } = this.props

    this.updateCanvasParameters(this.containerRef.current.clientWidth, currentMap, heroPosition)
  }

  render() {

    return (
      <div ref={this.containerRef}>
        <canvas ref={this.canvasRef} />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  currentMap: s.currentMap,
  heroPosition: s.heroPosition,
})

export default connect(mapStateToProps)(World)
