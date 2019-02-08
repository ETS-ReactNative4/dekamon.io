import React from 'react'
import { connect } from 'react-redux'
import registerCanvas from '../lib/battle/registerCanvas'
import gameConfiguration from '../lib/gameConfiguration'
import './Battle.css'

class Battle extends React.Component {

  containerRef = React.createRef()

  canvasRef = React.createRef()

  componentDidMount() {
    console.log('mounting Battle')

    window.addEventListener('resize', this.updateTileSize)

    this.updateTileSize()

    this.unregisterCanvas = registerCanvas(this.canvasRef.current)
  }

  componentWillUnmount() {
    console.log('unmounting Battle')

    this.unregisterCanvas()

    window.removeEventListerner('resize', this.updateTileSize)
  }

  updateTileSize = () => {
    const { dispatch } = this.props
    const { clientWidth, clientHeight } = this.containerRef.current

    const battleTileSize1 = clientWidth / gameConfiguration.battleWidth
    const battleTileSize2 = clientHeight / gameConfiguration.battleHeight
    const battleTileSize = Math.min(battleTileSize1, battleTileSize2)

    dispatch({
      type: 'SET_BATTLE_TILESIZE',
      payload: battleTileSize,
    })
  }

  render() {
    return (
      <div ref={this.containerRef} className="Battle relative x5">
        <canvas
          ref={this.canvasRef}
          className="Battle-canvas no-select"
        />
      </div>
    )
  }
}

export default connect()(Battle)
