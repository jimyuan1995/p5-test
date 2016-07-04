function ptsToStr(allPts) {
	var str = '';
	for (var i = 0; i < allPts.length; i++) {
		var part = allPts[i];
		var tmp = '';
		for (var j = 0; j < part.length; j++) {
			tmp += part[j].x + " " + pts[j].y;
			if (j != part.length - 1) tmp += " ";
		}

		str += tmp;
		if (i != allPts.length) str += ','; 
	}
	return str;
}

function strToPts(str) {
	var tmp = str.split(','),
		allPts = [];
	for (var i = 0; i < tmp.length; i++) {
		var tmp2 = tmp.split(' '),
			part = [];
		for (var j = 0; j < tmp2.length; j+=2) {
			part.push(new Point(tmp2[j], tmp2[j+1]));
		}

		allPts.push(part);
	}
	return allPts;
}