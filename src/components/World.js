import React from 'react'
import { connect } from 'react-redux'
import draw from '../lib/world/draw'

class World extends React.Component {

  containerRef = React.createRef()

  canvasRef = React.createRef()

  componentDidMount() {
    this.draw()

    window.addEventListener('resize', this.draw)
  }

  componentDidUpdate() {
    this.draw()
  }

  draw() {
    const { currentMap, heroPosition, dispatch } = this.props

    draw(this.canvasRef.current, this.containerRef.current.clientWidth, currentMap, heroPosition, dispatch)
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
