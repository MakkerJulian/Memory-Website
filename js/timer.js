function timer() {
	time++;
	document.getElementById('timer').innerHTML = "Tijd gespendeerd: " + time + " seconden";
}

var timeInterval = setInterval(timer, 1000);