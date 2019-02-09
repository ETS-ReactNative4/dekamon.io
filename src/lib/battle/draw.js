import store from '../../state/store'
import gameConfiguration from '../gameConfiguration'
import loadImages from '../loadImages'

function draw(_) {
  const { battleTileSize, battle: { battleMap, monsters } } = store.getState()

  _.canvas.width = battleTileSize * gameConfiguration.battleWidth
  _.canvas.height = battleTileSize * gameConfiguration.battleHeight

  _.clearRect(0, 0, _.canvas.width, _.canvas.height)

  const imageSourcesToLoad = []

  return loadImages(imageSourcesToLoad)
  .then(images => {
    const tileMargin = battleTileSize / 15

    _.fillStyle = '#ffed89'
    _.fillRect(0, 0, _.canvas.width, _.canvas.height)
    _.fillStyle = '#fff2aa'

    battleMap.forEach((row, y) => {
      row.forEach((column, x) => {
        _.fillRect(
          x * battleTileSize + tileMargin,
          y * battleTileSize + tileMargin,
          battleTileSize - 2 * tileMargin,
          battleTileSize - 2 * tileMargin
        )
      })
    })
  })
  .catch(console.error)
}

export default draw
