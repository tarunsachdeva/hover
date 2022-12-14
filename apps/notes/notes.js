const OPENAI_KEY = "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";
const OPENAI_MODEL = "text-davinci-003";
const SUMMARIZE_PROMPT = "\ntl;dr:";

var summaryCounter = 0;
const notepad = document.getElementById("notepad-content");
var selectedText = "";

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		let text = request.selectedText,
			quoteStyle = 'display:block;border-left:3px solid #ccc;padding:5px;margin-left:3px;',
			summarizeButton = '<button contenteditable=\"false\" id=\"summarize-button\" class=\"btn btn-primary btn-sm\">Summarize</button>';
		selectedText = text;
		notepad.innerHTML +=
			'<div style=\"' +
			quoteStyle +
			'\">' +
			text +
			'</div>'
			+ summarizeButton +
			'<br/><br/>';
		notepad.scrollTop = notepad.scrollHeight;
	}
);

document.getElementById("notepad-content").addEventListener('click', function (e) {
	const buttonTarget = e.target.closest("#summarize-button");
	if (buttonTarget) {
		summarizeText();
	}
});

function summarizeText() {
	/* call the OpenAI api to summarize some text */
	var text = selectedText + SUMMARIZE_PROMPT;
	var url = 'https://api.openai.com/v1/engines/davinci/completions';
	var apiKey = OPENAI_KEY;
	var data = {
		'prompt': text,
		'max_tokens': 50,
		'temperature': 0.7,
		'top_p': 1,
		'n': 1,
		'stream': false,
		'logprobs': null,
		'stop': ['.'],
	};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', 'Bearer ' + apiKey);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			var response = JSON.parse(xhr.responseText);
			var summary = response.choices[0].text;
			notepad.innerHTML += summary;
			notepad.scrollTop = notepad.scrollHeight;
		}
	};
	xhr.send(JSON.stringify(data));
	xhr.close();

	// notepad.innerHTML += "Summarize:"+selectedText;
}

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
function empty(element) {

	// Get the element's children as an array
	var children = Array.prototype.slice.call(element.childNodes);

	// Remove each child node
	children.forEach(function (child) {
		element.removeChild(child);
	});

}



