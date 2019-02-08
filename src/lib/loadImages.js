const sourceToImageCache = {}

// weak
function loadImages(sources) {
  const sourceToImage = {}
  const promises = []

  sources.forEach(source => {
    if (sourceToImageCache[source]) {
      sourceToImage[source] = sourceToImageCache[source]
    }
    else if (!promises[source]) {
      promises.push(new Promise((resolve, reject) => {
        const image = new Image()

        image.src = source
        image.onload = resolve
        image.onerror = reject
        sourceToImage[source] = image
        sourceToImageCache[source] = image
      }))
    }
  })

  return Promise.all(promises).then(() => sourceToImage)
}

export default loadImages
