import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

import World from './World'
import Battle from './Battle'
import WorldMaps from './WorldMaps'
import Inventory from './Inventory'

class App extends Component {

  state = {
    mode: null,
    // mode: 'inventory',
  }

  closeMode = () => this.setState({ mode: null })

  handleModalClick = e => {
    if (e.target === this.modalNode) {
      this.setState({ mode: null })
    }
  }

  handleNewGameClick = () => {
    localStorage.removeItem('state')
    window.location.reload()
  }

  render() {
    const { battle } = this.props
    const { mode } = this.state

    return (
      <div className="App y5">

        <div className="App-content">

          {!battle && <World />}

          {!!battle && <Battle />}

          {!!mode && (
            <div
              className="App-modal x5"
              onClick={this.handleModalClick}
              ref={node => this.modalNode = node}
            >

              {mode === 'world-map' && (
                <WorldMaps close={this.closeMode} />
              )}

              {mode === 'inventory' && (
                <Inventory close={this.closeMode} />
              )}

            </div>
          )}
        </div>

        <div className="x5">
          <button type="button" onClick={() => this.setState({ mode: 'world-map' })}>
            World map
          </button>
          <button type="button" onClick={() => this.setState({ mode: 'inventory' })}>
            Inventory
          </button>
          <button type="button" onClick={this.handleNewGameClick}>
            New game
          </button>
        </div>

      </div>
    )
  }
}

const mapStateToProps = s => ({
  battle: s.battle,
})

export default connect(mapStateToProps)(App)
