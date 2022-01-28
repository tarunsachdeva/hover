var baseMouseX, baseMouseY
var dragging = false;

  document.addEventListener('mousedown', handleMousedown)
  document.addEventListener('touchstart', handleTouchstart, { passive: false })

  function handleMousedown (evt) {
    return handleDragStart(evt)
  }

  function handleTouchstart (evt) {
    evt.preventDefault()
    return handleDragStart(evt.touches[0])
  }

  function handleDragStart({ clientX, clientY }) {
    dragging = true;
    baseMouseX = clientX
    baseMouseY = clientY

    window.parent.postMessage({
      msg: 'NOTEPAD_DRAG_START',
      mouseX: clientX,
      mouseY: clientY
    }, '*')

    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('touchend', handleDragEnd)
    document.addEventListener('mousemove', handleMousemove)
    document.addEventListener('touchmove', handleTouchmove, { passive: false })
  }

  function handleMousemove (evt) {
    return handleDragging(evt)
  }

  function handleTouchmove(evt) {
    evt.preventDefault()
    return handleDragging(evt.touches[0])
  }

  function handleDragging({ clientX, clientY }) {
    window.parent.postMessage({
      msg: 'NOTEPAD_DRAG_MOUSEMOVE',
      offsetX: clientX - baseMouseX,
      offsetY: clientY - baseMouseY
    }, '*')
  }

  function handleDragEnd () {
    window.parent.postMessage({
      msg: 'NOTEPAD_DRAG_END'
    }, '*')

    document.removeEventListener('mouseup', handleDragEnd)
    document.removeEventListener('touchend', handleDragEnd)
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mousemove', handleTouchmove)
  }