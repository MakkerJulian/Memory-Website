var savedCard = null;
var savedCard1 = null;
var savedCard2 = null;
var matched = 0;
var globalSize = 18;
var time = 0;

var getCardBackground = generateRandomImages;
var getBgImageUrl = getImageBgUrl;

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

(function (window, document, undefined) {
	window.onload = init;

	function init(){
		const leaderBoard = document.getElementById('leaderboard');
		getScores().then(scores => {
			scores = scores.sort((a, b) => b.score - a.score);
			scores.forEach(score => {
				const li = document.createElement('li');
				li.innerHTML = score.username + ' - ' + score.score;
				leaderBoard.appendChild(li);
			});
		});
	}
})(window, document, undefined);
