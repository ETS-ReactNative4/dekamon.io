const sourceToImage = {}

// weak
function loadImages(sources) {
  const images = {}
  const promises = []

  sources.forEach(source => {
    if (sourceToImage[source]) {
      images[source] = sourceToImage[source]
    }
    else if (!promises[source]) {
      promises.push(new Promise((resolve, reject) => {
        const image = new Image()

        image.src = source
        image.onload = resolve
        image.onerror = reject
        images[source] = image
        sourceToImage[source] = image
      }))
    }
  })

  return Promise.all(promises).then(() => images)
}

export default loadImages
