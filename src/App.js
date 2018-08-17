import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

import MapSection from './components/MapSection'
import GlobalMap from './components/GlobalMap'
import PositionButtons from './components/PositionButtons'
import 'flexpad/dist/flexpad.min.css'

// https://www.gamedevmarket.net/asset/2d-topdown-tile-set-6645/

class App extends Component {

  render() {
    // const { hero } = this.props

    return (
      <div className="App y8">
        <MapSection />
        <PositionButtons />
        <GlobalMap />
      </div>
    )
  }
}

const mapStateToProps = s => ({
  hero: s.hero,
})

export default connect(mapStateToProps)(App)
