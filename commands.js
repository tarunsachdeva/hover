const OpenAIapiKey = "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";

// Add Event Listeners
const summarizeButton = document.getElementById("summarize-button");
summarizeButton.addEventListener("click", summarize);



// document.getElementById("save-button").addEventListener("click", saveToNotion);
// document.getElementById("close-button").addEventListener("click", closeApp);

function getText () {
  const textArea = document.getElementById("notepad-content");
  const innerText = textArea.innerText;
  
  if(innerText[innerText.length-1] === '\n') 
      innerText = innerText.slice(0,-1)             // get rid of weird extra newline
  return innerText 
}


function summarize() {

}


// const options = {
//     method: 'POST',
//     headers: {
//       accept: 'application/json',
//       'Notion-Version': '2022-06-28',
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({parent: '31b99217135240c68da3a2fefad62a69', title: "A new page", properties: 'string'})
//   };

// function saveToNotion() {
//     fetch('https://api.notion.com/v1/pages', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
// }

// function closeApp () {
//   const appContainer = document.getElementById("app-container");
//   console.log("App Container:"+appContainer.innerHTML);
//   appContainer.setAttribute("display","none");
// }