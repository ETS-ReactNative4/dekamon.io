import React from 'react'
import { connect } from 'react-redux'
import registerCanvas from '../lib/world/registerCanvas'

class World extends React.Component {

  containerRef = React.createRef()

  canvasRef = React.createRef()

  componentDidMount() {
    this.registerCanvas()

    window.addEventListener('resize', this.registerCanvas)
  }

  componentDidUpdate() {
    this.registerCanvas()
  }

  registerCanvas() {
    const { currentMap, heroPosition, dispatch } = this.props

    registerCanvas(this.canvasRef.current, this.containerRef.current.clientWidth, currentMap, heroPosition, dispatch)
  }

  render() {

    return (
      <div ref={this.containerRef} className="flex-grow">
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
