// listen for our browerAction to be clicked
chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.id, { file: "interact.min.js" }, function(){
		chrome.tabs.executeScript(tab.id, { file: "mark.min.js" }, function(){
			chrome.tabs.executeScript(tab.id, { file: "contentscript.js" }, function(){})
		});
	});
});