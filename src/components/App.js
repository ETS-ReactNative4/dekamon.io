import React, { Component } from 'react'
import './App.css'

import World from './World'
import WorldMap from './WorldMap'
import PositionButtons from './PositionButtons'

// https://www.gamedevmarket.net/asset/2d-topdown-tile-set-6645/

class App extends Component {

  render() {
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

export default App
