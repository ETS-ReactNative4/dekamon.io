import gameConfiguration from '../gameConfiguration'

function draw(canvasElement, width, mapDefinition) {
  const tileSize = width / gameConfiguration.worldWidth
  const height = tileSize * gameConfiguration.worldHeight

  canvasElement.width = width
  canvasElement.height = height

  const _ = canvasElement.getContext('2d')

  _.clearRect(0, 0, width, height)
  _.fillStyle = 'black'

  const roadImagesPartialSources = [
    'tile_road_256_01.png',
    'tile_road_256_02.png',
    'tile_road_256_03.png',
    'tile_road_256_04.png',
    'tile_road_256_05.png',
    'tile_road_256_06.png',
    'tile_road_256_07.png',
    'tile_road_256_08.png',
    'tile_road_256_09.png',
    'tile_road_256_10.png',
    'tile_road_256_11.png',
    'tile_road_256_12.png',
    'tile_road_256_13.png',
    'tile_road_256_14.png',
    'tile_road_256_15.png',
    'tile_road_256_16.png',
    'tile_road_256_17.png',
  ]

  const roadImagesPromises = []
  const roadImages = {}

  roadImagesPartialSources.forEach(partialSource => {
    const image = new Image

    image.src = `/images/Sprites/${mapDefinition.biome}/${mapDefinition.biome}_${partialSource}`

    roadImages[partialSource] = image

    roadImagesPromises.push(new Promise(resolve => image.onload = resolve))
  })

  console.log(roadImagesPromises  );
  // image.onload = () => {
  //   _.drawImage(image, 0, 0, tileSize, tileSize)
  // }

  Promise.all(roadImagesPromises)
  .then(() => {
    console.log('done loading');
    mapDefinition.tiles.forEach((row, j) => {
      row.forEach((imagePartialSource, i) => {
        if (imagePartialSource) {
          console.log(roadImages[imagePartialSource]);
          // _.fillRect(i * tileSize, j * tileSize, tileSize, tileSize)
          _.drawImage(roadImages[imagePartialSource], i * tileSize, j * tileSize, tileSize, tileSize)
        }
      })
    })
  })
  .catch(console.error)

}

export default draw
