var url = 'localhost:8888/test';

function test(drawnPoints) {
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', url, true);
	var str = ptsToStr(drawnPoints);
	console.log(str);
	xhttp.send(str);
}
