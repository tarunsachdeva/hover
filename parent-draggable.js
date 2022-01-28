;(function () {
  var pageMouseX, pageMouseY
  var $iframe = document.querySelector('#app-frame')
  var frameTop = 0
  var frameLeft = 0
  $iframe.style.top = frameTop + 'px'
  $iframe.style.left = frameLeft + 'px'
  window.addEventListener('message', evt => {
    const data = evt.data
    switch (data.msg) {
      case 'NOTEPAD_DRAG_START':
        handleDragStart(data.mouseX, data.mouseY)
        break
      case 'NOTEPAD_DRAG_MOUSEMOVE':
        handleFrameMousemove(data.offsetX, data.offsetY)
        break
      case 'NOTEPAD_DRAG_END':
        handleDragEnd()
        break
    }
  })
  
  function handleDragStart (mouseX, mouseY) {
    console.log("Drag Start")

    pageMouseX = frameLeft + mouseX
    pageMouseY = frameTop + mouseY
    document.addEventListener('mouseup', handleDragEnd)
    document.addEventListener('mousemove', handlePageMousemove)
  }
  function handleDragEnd () {
    console.log("Drag End")

    document.removeEventListener('mouseup', handleDragEnd)
    document.removeEventListener('mousemove', handlePageMousemove)
  }

  function handleFrameMousemove (offsetX, offsetY) {
    console.log("Drag In Progress - Frame")

    frameTop += offsetY
    frameLeft += offsetX
    $iframe.style.top = frameTop + 'px'
    $iframe.style.left = frameLeft + 'px'
    pageMouseX += offsetX
    pageMouseY += offsetY
  }
  function handlePageMousemove (evt) {
    console.log("Drag in Progress - Page")

    frameTop += evt.clientX - pageMouseX
    frameLeft += evt.clientY - pageMouseY
    $iframe.style.top = frameTop + 'px'
    $iframe.style.left = frameLeft + 'px'
    pageMouseX = evt.clientX
    pageMouseY = evt.clientY
  }
})()
