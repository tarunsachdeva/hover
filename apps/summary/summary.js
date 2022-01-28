var summaryButton = document.getElementById("summarize");
summaryButton.onclick = summaryOpenAI;

function summaryOpenAI () {
  	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = printSummary();
	xhr.open('POST', 'https://api.openai.com/v1/engines/davinci/completions');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Authorization", "Bearer sk-yDemCP23fCx97LI3MPf74KowZWG7FxqrNCN8R8gl");
	var str = "Theodore John Kaczynski, also known as the Unabomber, is an American domestic terrorist and former mathematics professor. He was a mathematics prodigy, but abandoned his academic career in 1969 to pursue a primitive life. Between 1978 and 1995, he killed three people and injured 23 others in a nationwide bombing campaign against people he believed to be advancing modern technology and the destruction of the environment. He issued a social critique opposing industrialization and advocating a nature-centered form of anarchism. Kaczynskis critiques of civilization bear some similarities to anarcho-primitivism, but Kaczynski rejected and criticized anarcho-primitivist views. In 1971, Kaczynski moved to a remote cabin without electricity or running water near Lincoln, Montana, where he lived as a recluse while learning survival skills to become self-sufficient. He witnessed the destruction of the wilderness surrounding his cabin and concluded that living in nature was becoming impossible, resolving to fight industrialization and its destruction of nature. He used terrorism to fight this industrialization, beginning his bombing campaign in 1978. In 1995, he sent a letter to The New York Times and promised to desist from terrorism if the Times or The Washington Post published his essay Industrial Society and Its Future, in which he argued that his bombings were extreme but necessary to attract attention to the erosion of human freedom and dignity by modern technologies that require mass organization. Kaczynski was the subject of the longest and most expensive investigation in the history of the Federal Bureau of Investigation up to that point. The FBI used the case identifier UNABOM (University and Airline Bomber) to refer to his case before his identity was known, which resulted in the media naming him the Unabomber. The FBI and Attorney General Janet Reno pushed for the publication of Industrial Society and Its Future, which appeared in The Washington Post in September 1995. Upon reading the essay, Kaczynskis brother David recognized the prose style and reported his suspicions to the FBI. After his arrest in 1996, Kaczynski—maintaining that he was sane—tried and failed to dismiss his court-appointed lawyers because they wanted him to plead insanity to avoid the death penalty. In 1998, a plea bargain was reached under which he pleaded guilty to all charges and was sentenced to eight consecutive life terms in prison without the possibility of parole." + " One sentence summary:";
	xhr.send('{"prompt": "' + str + '", "temperature": 0.3, "top_p": 1, "max_tokens": 300}');
}

function printSummary() {
	let responseText = this.responseText;
	console.log(responseText);
	document.getElementById("summary-from-openai").innerHTML = responseText;	
}
