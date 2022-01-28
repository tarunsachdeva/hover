let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({color}) => {
	changeColor.style.backgroundColor = color;
});

// when button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async() => {
	let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

	chrome.scripting.executeScript ({
		target: {tabId: tab.id},
		function: setPageBackgroundColor,
	});
});

function setPageBackgroundColor() {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color;
	});
}