import React, { Component } from 'react'
import './App.css'

import World from './World'
import WorldMap from './WorldMap'
import Inventory from './Inventory'

class App extends Component {

  state = {
    // mode: null,
    mode: 'inventory',
  }

  closeMode = () => this.setState({ mode: null })

  handleModalClick = e => {
    if (e.target === this.modalNode) {
      this.setState({ mode: null })
    }
  }

  render() {
    const { mode } = this.state

    return (
      <div className="App y5">

        <div className="App-content">

          <World />

          {!!mode && (
            <div
              className="App-modal x5"
              onClick={this.handleModalClick}
              ref={node => this.modalNode = node}
            >

              {mode === 'world-map' && (
                <WorldMap close={this.closeMode} />
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
        </div>

      </div>
    )
  }
}

export default App
