var savedCard = null;
var savedCard1 = null;
var savedCard2 = null;
var matched = 0;
var globalSize = 18;
var time = 0;

var getCardBackground = generateRandomImages;
var getBgImageUrl = getImageBgUrl;

function timer() {
	time++;
	document.getElementById('timer').innerHTML = "Tijd gespendeerd: " + time + " seconden";
}

var timeInterval = setInterval(timer, 1000);


function changeOpen() {
	var openInput = document.getElementById("openInput");
	var openCards = document.getElementsByClassName("open");

	for (var i = 0; i < openCards.length; i++) {
		openCards[i].style.backgroundColor = openInput.value;
	}
	document.documentElement.style.setProperty('--colorOpen', openInput.value)
}

function changeMatch() {
	var matchInput = document.getElementById("matchedInput");
	var matchCards = document.getElementsByClassName("match");

	for (var i = 0; i < matchCards.length; i++) {
		matchCards[i].style.backgroundColor = matchInput.value;
	}
	document.documentElement.style.setProperty('--colorMatch', matchInput.value);
}

function changeClose() {
	var closeInput = document.getElementById("closedInput");
	var closeCards = document.getElementsByClassName("close");

	for (var i = 0; i < closeCards.length; i++) {
		closeCards[i].style.backgroundColor = closeInput.value;
	}
	document.documentElement.style.setProperty('--colorClose', closeInput.value)
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

async function getTopFive(){
	const res = await fetch('localhost:8000/api/scores');	
}

function changeScore(score) {
	document.getElementById('score').innerHTML = "Score: " + score;
}


function getImageBgUrl(cardId) {
	return "url(https://picsum.photos/id/" + cardId + "/200)";
}

function generateRandomImages() {
	var images = [];
	return fetch('https://picsum.photos/v2/list?limit=' + globalSize)
		.then(response => response.json())
		.then(jsonImages => {
			jsonImages.forEach(image => {
				images.push(image.id);
				images.push(image.id);
			});
			images.sort(() => Math.random() - 0.5);
			return images;
		});
}
async function switchBackground(bg) {
	switch (bg) {
		case "images":
			getCardBackground = generateRandomImages;
			getBgImageUrl = getImageBgUrl;
			break;
		case "cats":
			getCardBackground = generateCats;
			getBgImageUrl = getCatBgUrl;
			break;
		default:
			getCardBackground = generateRandomImages;
			getBgImageUrl = getImageBgUrl;
			break;
	}
	generateCards();
}

async function generateCats() {
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

function getCatBgUrl(cardId) {
	return "url(https://cataas.com/cat/" + cardId + ")";
}

async function generateCards() {
	reset();

	var cardContainer = document.getElementById("cardContainer");

	var backgrounds = await getCardBackground();
	//empty the card container
	cardContainer.innerHTML = "";
	for (let i = 1; i < (globalSize * 2) + 1; i++) {
		var card = document.createElement("button");
		card.className = "card close";
		card.innerHTML
		card.id = "card" + i;
		card.value = backgrounds[i - 1];
		card.onclick = () => changeToOpen(i);
		cardContainer.appendChild(card);
	}
}

function changeToOpen(cardId) {
	var card = document.getElementById("card" + cardId);

	if (card.className === "card match" || savedCard === cardId) return;

	card.className = "card open";
	card.style.backgroundImage = getBgImageUrl(card.value);

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
