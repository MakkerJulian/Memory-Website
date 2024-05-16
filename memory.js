var savedCard = null;
var foundIds = [];
function changeOpen() {
  var openInput = document.getElementById("openInput");
  var openCards = document.getElementsByClassName("open");
  console.log(openCards);

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

function generateCards(size = 18) {
  //generate a random list of letters
  var letters = [];
  for (let i = 0; i < size; i++) {
    letters.push(String.fromCharCode(65 + i));
    letters.push(String.fromCharCode(65 + i));
  }
  letters.sort(() => Math.random() - 0.5);

  var cardContainer = document.getElementById("cardContainer");
  //empty the card container
  cardContainer.innerHTML = "";
  for (let i = 0; i < size * 2; i++) {
    var card = document.createElement("button");
    card.className = "card close";
    card.id = "card"+i;
    card.value = letters[i];
    card.onclick = () => changeToOpen(i);
    cardContainer.appendChild(card);
  }
}

function changeToOpen(cardId) {
  var card = document.getElementById("card"+cardId);
  card.className = "card open";
  card.innerHTML = card.value;
  if(foundIds.includes(cardId)){
    return;
  }
  if (!savedCard) {
    savedCard = cardId;
  } else {
    var card2 = document.getElementById("card"+savedCard);
    if (card2.value === card.value) {
      card.className = "card match";
      card2.className = "card match";
      savedCard = null;
    } else {
      setTimeout(() => {
        card.className = "card close";
        card2.className = "card close";
        savedCard = null;
        card.innerHTML = "";
        card2.innerHTML = "";
      }, 500);
    }
  }
}