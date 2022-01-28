// const APP_NAME = "notes";
// const DISPLAY_NAME = "Notepad";
// registerListener(APP_NAME);

// // FOR REFERENCE
// // 	document = iframe document

// function appMain(){
// 	console.log('In ' + APP_NAME);
// //	setActiveTab(APP_NAME, DISPLAY_NAME);
// 	document.getElementById(APP_NAME).src = chrome.runtime.getURL("notes.html");
// }

// function registerListener (appName){
// 	document.getElementById(appName).addEventListener("click", appMain);
// }s
var copyButton = document.getElementById("copy-to-notepad");
//copyButton.onclick = pasteClipboardToNotepad;


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	let text = request.selectedText,
  	notepad = document.getElementById("notepad-content"),
  	quoteStyle = 'display:block;border-left:3px solid #ccc;padding:5px;margin-left:3px;';

  	//document.getElementById("clipboard").innerHTML = text;
  	notepad.innerHTML +=
  			'<div style=\"' +
					quoteStyle +
				'\">' +
					text +
				'</div><br/>';

  	//console.log("Button Display:"+document.getElementById("copy-to-notepad").style.display);

//  	copyButton.classList.add("d-block");
//	 	copyButton.classList.remove("d-none");
  	console.log("WHAT THE IFRAME SAW "+request.selectedText);
  }
);


document.getElementById("notepad-content").addEventListener('focusout', function (e) {
	var element = this;
   if (!element.innerText.replace(" ", "").length) {
       empty(element);
   }
});

function pasteClipboardToNotepad() {
	let notepad = document.getElementById("notepad-content"),
	clipboard = document.getElementById("clipboard"),
	quoteStyle = 'display:block;border-left:3px solid #ccc;padding:5px;';
	
	notepad.innerHTML +=
		'<div style=\"' +
		quoteStyle +
		'\">' +
		clipboard.innerHTML +
		'</div><br/>';

	clipboard.innerHTML = "";
//		pasted = true;
};

/**
 * Remove all child nodes from an element
 * @param {Object} element The element to empty
 */
function empty (element) {

  // Get the element's children as an array
  var children = Array.prototype.slice.call(element.childNodes);

  // Remove each child node
  children.forEach(function (child) {
    element.removeChild(child);
  });

}
