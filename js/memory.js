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
	startGame();
}

function changeScore(score) {
	document.getElementById('score').innerHTML = "Score: " + score;
}

async function startGame() {
	var preferences = await getPreferences(getCurrentUserId());

	const congrats = document.getElementsByClassName('congrats');
	if (congrats.length > 0) {
		congrats[0].remove();
	}
	switch (preferences.preferred_api) {
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
	generateCards(preferences);
}

function logout() {
	localStorage.removeItem('memoryToken');
}

async function generateCards(preferences) {
	reset();
	document.documentElement.style.setProperty('--colorMatch', preferences.color_found)

	var cardContainer = document.getElementById("cardContainer");

	var backgrounds = await getCardBackground();
	//empty the card container
	cardContainer.innerHTML = "";
	for (let i = 1; i < (globalSize * 2) + 1; i++) {
		var card = document.createElement("button");
		card.className = "card close";
		card.get
		card.innerHTML
		card.id = "card" + i;
		card.value = backgrounds[i - 1];
		card.style.backgroundColor = preferences.color_closed;
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
	const userId = getCurrentUserId();
	saveGame(userId, time);
	const root = document.getElementsByClassName('container')[0];
	const congrats = document.createElement('button');
	congrats.className = 'congrats';
	congrats.innerHTML = 'Gefeliciteerd! Je hebt het spel uitgespeeld in ' + time + ' seconden. Klik om opnieuw te spelen';
	congrats.onclick = startGame;
	root.appendChild(congrats);
}

(function (window, document, undefined) {
	window.onload = init;

	async function init() {
		const leaderBoard = document.getElementById('leaderboard');
		getScores().then(scores => {
			scores = scores.sort((a, b) => b.score - a.score);
			scores.forEach(score => {
				const li = document.createElement('li');
				li.innerHTML = score.username + ' - ' + score.score;
				leaderBoard.appendChild(li);
			});
		});
		const isAdmin = await checkAdmin();
		if (isAdmin) {
			const buttons = document.getElementsByClassName('links')[0];
			const button = document.createElement('a');
			button.href = 'http://localhost:4200';
			button.className = 'button-link';
			button.id = 'admin button';
			button.innerHTML = '<button type="button">Go to Adminpage</button>';
			buttons.appendChild(button);
		}
	}
})(window, document, undefined);
