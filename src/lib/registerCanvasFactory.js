function registerCanvasFactory(eventListeners, draw) {
  // A function called once for registering the canvas event listeners
  return canvas => {
    const _ = canvas.getContext('2d')

    // For debug purposes
    // window.canvas = canvas
    // window._ = _

    eventListeners.forEach(([eventType, eventHandler]) => {
      canvas.addEventListener(eventType, e => eventHandler(e, canvas))
    })

    let requestId

    // Cancel previous draw
    cancelAnimationFrame(requestId)

    // Draw the canvas
    const drawStep = () => {
      draw(_)
      requestId = requestAnimationFrame(drawStep)
    }

    requestId = requestAnimationFrame(drawStep)

    // Return unregisterCanvas
    return () => cancelAnimationFrame(requestId)
  }
}


export default registerCanvasFactory
