var to_be_sorted = ["sin()", "Omega", "alpha", "g", "K", "B", "cos()", "l", "L", "ln()"];


// helper arrays
var latinLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var latinLettersUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var greekLetters = ["\\alpha","\\beta","\\gamma","\\delta","\\varepsilon","\\zeta","\\eta","\\theta","\\iota","\\kappa","\\lambda","\\mu","\\nu","\\xi","\\omicron","\\pi","\\rho","\\sigma","\\tau","\\upsilon","\\phi","\\chi","\\psi","\\omega"];
var greekLettersUpper = ["\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi","\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega"];


function forEachIn(arr, func) {
	for (var i = 0; i < arr.length; i++) {
		arr[i] = func(arr[i]);
	}
}
function rmSlash(x) {
	return x.slice(1);
}
forEachIn(greekLetters, rmSlash);
forEachIn(greekLettersUpper, rmSlash);


var orderArrays = [latinLetters, latinLettersUpper, greekLetters, greekLettersUpper];

function classFt(a) {
	var len = a.length;

	// if a is function name
	if (a.slice(-2) === "()") {
		return 4;
	}

	// if a is latin
	if (len === 1) {
		if (a.toUpperCase() === a) {
			return 1;
		} else {
			return 0;
		}
	}

	// if a is greek
	var head = a.slice(0,1);
	if (head.toUpperCase() === head) {
		return 3;
	} else {
		return 2;
	}
}

function compare(a, b) {
	if (classFt(a) < classFt(b)) {
		return -1;
	} else if (classFt(a) > classFt(b)) {
		return 1
	} else {
		// if a,b are function names
		if (classFt(a) === 4) {
			if (a > b) {
				return 1;
			} else if (a === b) {
				return 0;
			} else return -1;
		}
		
		// otherwise
		var orderArray = orderArrays[classFt(a)];
		var na = orderArray.indexOf(a);
		var nb = orderArray.indexOf(b);
		if (na < nb) {
			return -1;
		} else if (na === nb) {
			return 0;
		} else return 1;
	}

}

console.log(to_be_sorted.sort(compare));









