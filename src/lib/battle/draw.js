import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import loadImages from '../loadImages'

function draw(_) {
  const { battleTileSize, battle } = store.getState()

  _.canvas.width = battleTileSize * gameConfiguration.battleWidth
  _.canvas.height = battleTileSize * gameConfiguration.battleHeight

  _.clearRect(0, 0, _.canvas.width, _.canvas.height)

  const imageSourcesToLoad = [
  ]

  return loadImages(imageSourcesToLoad)
  .then(images => {
    
  })
  .catch(console.error)
}

export default draw
