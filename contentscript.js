

// Add App Frame to the Page
addFrame();

// Make App Frame Resizable and Draggable
interact('#app-container')
  .resizable({
    // resize from all edges and corners
    edges: { left: false, right: true, bottom: true, top: false },
    listeners: { 
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // HIDDEN DIV SOLUTION BASED ON THIS: https://github.com/taye/interact.js/issues/200
        // let hiddenDiv = document.createElement("div")
        // hiddenDiv.setAttribute("z-index",99999999)
        // hiddenDiv.style.width = "100%"
        // hiddenDiv.style.height = "100%"
        // hiddenDiv.style.opacity = "0"
        // target.appendChild(hiddenDiv)

        console.log("Resizing!")

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)

        // target.removeChild(hiddenDiv)
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ]
  });

// Reset Selection End Timeout
var selectionEndTimeout = null;

var markInstance = new Mark(document.querySelector("body"));
// var notepadIframe = document.getElementById("app-frame");
// console.log("IFrameHTML:"+notepadIframe.outerHTML);
// var typedInput = notepadIframe.contentWindow.document.getElementById("notepad-content");


/*
--------------
EVENT HANDLERS
--------------
*/

// Handle Keypress (for shortcuts)
document.onkeyup = function (e) {
	console.log('Parent Document KeyUp:'+e.keyCode);

 	if (e.keyCode == 77) {
 		toggleVisibility(document.getElementById("app-container"));
  }
}

document.onselectionchange = userSelectionChanged;

document.addEventListener("selectionEnd", function () {
    // reset selection timeout
    selectionEndTimeout = null;

    // TODO: Do your cool stuff here........
    console.log("User Selection Ended");
    
    // get user selection
    var selectedText = getSelectionText();
    // if the selection is not empty show it :)
    if(selectedText != '') {
      chrome.runtime.sendMessage({selectedText: selectedText.toString()}, function (response){
        console.log("Response"+response);
      });
    }
});



/*
--------------
FUNCTIONS
--------------
*/

function addFrame() {
	let parentDocument = document;

	var appContainerDiv = parentDocument.createElement("div");
  var appIframe  = parentDocument.createElement("iframe");
	var appContainerStyleLink = parentDocument.createElement("link");
	var appContainerScript = parentDocument.createElement("script");

  appContainerDiv.id = "app-container";
	appContainerDiv.className += "resize-drag";

	appContainerStyleLink.href = chrome.extension.getURL("app-frame-style.css");
	appContainerStyleLink.type = "text/css";
	appContainerStyleLink.rel = "stylesheet";

	appIframe.id = "app-frame";
	appIframe.src  = chrome.runtime.getURL ("app-frame.html");
  
	appIframe.allowTransparency = "true";

	appContainerDiv.appendChild(appIframe);
	document.getElementsByTagName("head")[0].appendChild(appContainerStyleLink);
  parentDocument.body.insertBefore(appContainerDiv, parentDocument.body.firstChild);
	parentDocument.body.insertBefore (appContainerScript, parentDocument.body.firstChild);

  fadeIn(appContainerDiv,20,0.075);
}

function toggleVisibility (obj) {	
    if(obj.style.visibility == "visible") {
        //obj.style.visibility = 'hidden';
        //fadeOut(obj);
    }
    else {
      fadeIn(obj);
    }
 //       obj.style.visibility = 'visible';
}

function dragMoveListener (event) {
	console.log("Drag Move Event Fired")
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

function userSelectionChanged() {
    // wait 500 ms after the last selection change event
    if (selectionEndTimeout) {
        clearTimeout(selectionEndTimeout);
        console.log("User Selection Changed");
    }
    selectionEndTimeout = setTimeout(function () {
      document.dispatchEvent( new Event('selectionEnd') );
    }, 1000);
}

// Get text from selection
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    console.log("Text:"+text);
    return text;
}

function fadeIn(element,delay,increment) {
    var op = 0;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += increment;
    }, delay);
}

function performMark() {

  // Read the keyword
  var keyword = typedInput.value;

  // Determine selected options
  var options = {};
  [].forEach.call(optionInputs, function(opt) {
    options[opt.value] = opt.checked;
  });

  // Remove previous marked elements and mark
  // the new keyword inside the context
  markInstance.unmark({
    done: function(){
      markInstance.mark(keyword, options);
    }
  });
};