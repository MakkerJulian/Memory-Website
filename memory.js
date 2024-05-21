var savedCard = null;
var savedCard1 = null;
var savedCard2 = null;
var matched = 0;
var globalSize = 18;
var time = 0;

var getCardBackground= function(){}


function timer() {
	//start counting time when the match starts
	time++;
	document.getElementById('timer').innerHTML = "Time spent: " + time + " seconds";
}

var timerInterval = setInterval(timer, 1000);


function changeOpen() {
	var openInput = document.getElementById("openInput");
	var openCards = document.getElementsByClassName("open");

	for (var i = 0; i < openCards.length; i++) {
		openCards[i].style.backgroundColor = openInput.value;
	}
}

function changeMatch() {
	var matchInput = document.getElementById("matchedInput");
	var matchCards = document.getElementsByClassName("match");

	for (var i = 0; i < matchCards.length; i++) {
		matchCards[i].style.backgroundColor = matchInput.value;
	}
}

function changeClose() {
	var closeInput = document.getElementById("closedInput");
	var closeCards = document.getElementsByClassName("close");

	for (var i = 0; i < closeCards.length; i++) {
		closeCards[i].style.backgroundColor = closeInput.value;
	}
}

function reset() {
	matched = 0;
	time = 0;
	savedCard = null;
	savedCard1 = null;
	savedCard2 = null;
	changeScore(0);
}

function changeSize(size) {
	globalSize = size;
	generateCards();
}

function changeScore(score) {
	document.getElementById('score').innerHTML = "Score: " + score;
}

function generateLetters() {
	//generate a random list of letters
	var letters = [];
	for (let i = 0; i < globalSize; i++) {
		letters.push(String.fromCharCode(65 + i));
		letters.push(String.fromCharCode(65 + i));
	}
	letters.sort(() => Math.random() - 0.5);
	return letters;
}

function generateCats() {
	var cats = [];
	return fetch('https://cataas.com/api/cats?limit=' + globalSize)
		.then(response => response.json())
		.then(jsonCats => {
			jsonCats.forEach(cat => {
				cats.push(cat._id);
				cats.push(cat._id);
			});
			cats.sort(() => Math.random() - 0.5);
			return cats;
		}
	);
}

async function generateCards() {
	reset();

	var cardContainer = document.getElementById("cardContainer");

	var cats= await generateCats();
	//empty the card container
	cardContainer.innerHTML = "";
	for (let i = 1; i < (globalSize * 2) + 1; i++) {
		var card = document.createElement("button");
		card.className = "card close";
		card.innerHTML
		card.id = "card" + i;
		card.value = cats[i - 1];
		card.onclick = () => changeToOpen(i);
		cardContainer.appendChild(card);
	}
}

function changeToOpen(cardId) {
	var card = document.getElementById("card" + cardId);

	if (card.className === "card match" || savedCard === cardId) return;

	card.className = "card open";
	card.style.backgroundImage = "url('https://cataas.com/cat/" + card.value + "')";

	if (!savedCard) {
		var card1 = document.getElementById("card" + savedCard1);
		var card2 = document.getElementById("card" + savedCard2);
		if (card1 && card2 && card1.className != "card match") {
			card1.className = "card close";
			card2.className = "card close";
			card1.style.backgroundImage = "none";
			card2.style.backgroundImage = "none";
		}
		savedCard = cardId;
		savedCard1 = cardId;
	} else {
		savedCard2 = cardId;
		var card2 = document.getElementById("card" + savedCard);
		if (card2.value === card.value) {
			card.className = "card match";
			card2.className = "card match";
			savedCard = null;
			matched++;
			changeScore(matched);
			if (matched == globalSize) congratulateAndReset();
		} else {
			savedCard = null;
		}
	}
}

function congratulateAndReset() {
	alert("Congratulations! You have won! in " + time + " seconds");
	generateCards(globalSize);
}