import gameConfiguration from '../gameConfiguration'
import loadImages from './loadImages'

function draw(canvasElement, width, mapDefinition) {
  const tileSize = width / gameConfiguration.worldWidth
  const height = tileSize * gameConfiguration.worldHeight

  canvasElement.width = width
  canvasElement.height = height

  const _ = canvasElement.getContext('2d')

  _.clearRect(0, 0, width, height)

  const imageSourcesToLoad = []

  mapDefinition.tiles.forEach(row => {
    row.forEach(tile => {
      if (tile) {
        imageSourcesToLoad.push(tile.backgroundImageSource)
      }
    })
  })

  loadImages(imageSourcesToLoad)
  .then(images => {
    mapDefinition.tiles.forEach((row, j) => {
      row.forEach((tile, i) => {
        if (tile) {
          _.drawImage(images[tile.backgroundImageSource], i * tileSize, j * tileSize, tileSize, tileSize)
        }
      })
    })
  })
  .catch(console.error)

  // const roadImagesPromises = []
  // const roadImages = {}
  //
  // roadImagesPartialSources.forEach(partialSource => {
  //   const image = new Image
  //
  //   image.src = `/images/Sprites/${mapDefinition.biome}/${mapDefinition.biome}_${partialSource}`
  //
  //   roadImages[partialSource] = image
  //
  //   roadImagesPromises.push(new Promise(resolve => image.onload = resolve))
  // })
  //
  // console.log(roadImagesPromises  );
  // // image.onload = () => {
  // //   _.drawImage(image, 0, 0, tileSize, tileSize)
  // // }
  //
  // Promise.all(roadImagesPromises)
  // .then(() => {
  //   console.log('done loading');
  //
  // })
  // .catch(console.error)

}

export default draw
