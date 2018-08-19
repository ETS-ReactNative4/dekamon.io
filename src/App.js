import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

import World from './components/World'
import WorldMap from './components/WorldMap'
import PositionButtons from './components/PositionButtons'
import 'flexpad/dist/flexpad.min.css'

// https://www.gamedevmarket.net/asset/2d-topdown-tile-set-6645/

class App extends Component {

  render() {
    // const { hero } = this.props

    return (
      <div className="App x4">
        <div>
          <WorldMap />
          <PositionButtons />
        </div>
        <World />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  hero: s.hero,
})

export default connect(mapStateToProps)(App)
