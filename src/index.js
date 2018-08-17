import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'
import './index.css'
import './normalize.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import generateMap from './lib/generateMap'

store.dispatch({
  type: 'CREATE_MAP',
  payload: {
    position: [0, 0],
    ...generateMap(),
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
