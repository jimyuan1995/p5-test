function httpGet(url) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send(null);
	return JSON.parse(xhr.responseText);
}

