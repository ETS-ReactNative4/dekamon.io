import React, { Component } from 'react'
import './App.css'

import World from './World'
import WorldMap from './WorldMap'

class App extends Component {

  state = {
    mode: null,
  }

  closeMode = () => this.setState({ mode: null })

  render() {
    const { mode } = this.state

    return (
      <div className="App y5">

        <div className="App-content">

          <World />

          {!!mode && (
            <div className="App-mode x5">

              {mode === 'world-map' && (
                <WorldMap close={this.closeMode} />
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
