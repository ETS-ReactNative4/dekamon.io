import store from '../../state/store'
import registerCanvasFactory from '../registerCanvasFactory'
import draw from './draw'

const eventListeners = [
  ['click', (e, canvas) => {
    console.log('click')
  }],
]

export default registerCanvasFactory(eventListeners, draw)
