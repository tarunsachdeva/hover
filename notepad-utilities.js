// Detect keystrokes in iframe
document.getElementById("notepad-content").addEventListener("input", function() {
    console.log("input event fired");
    let notepadText = document.getElementById("notepad-content").textContent;
  	console.log('ContentTyped:'+notepadText);

// Send message from active tab to background: 
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, notepadText);
});
}, false);

document.onkeydown = function (e) {
  	console.log('Iframe Keystroke:'+e.keyCode);
//  	document.getElementById("keystroke").innerHTML = 'key:' + e.keyCode;
};