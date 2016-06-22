var count = 0;
var numChance = 3;
var password = "123";

var name = prompt("Please enter your name");
while (count < numChance) {
	var pw = prompt("Hello " + name + "! Please enter your password. You have " + (numChance - count) + " chances remaining.");
	count++;
	if (pw === password) {
		confirm("Your password is correct. Welcome!");
	} else {
		alert("Sorry, incorrect password. Please try again.");
	}
}