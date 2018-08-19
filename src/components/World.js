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
    draw(this.canvasRef.current, this.containerRef.current.clientWidth, this.props.currentMap)
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
})

export default connect(mapStateToProps)(World)
