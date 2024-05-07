function changeOpen() {
  var openInput = document.getElementById("openInput");
  var openCards = document.getElementsByClassName("open");
  console.log(openCards);

  for( var i = 0; i < openCards.length; i++) {
    openCards[i].style.backgroundColor = openInput.value;
  }
}

function changeMatch() {
  var matchInput = document.getElementById("matchedInput");
  var matchCards = document.getElementsByClassName("match");

  for( var i = 0; i < matchCards.length; i++) {
    matchCards[i].style.backgroundColor = matchInput.value;
  }
}

function changeClose() {
  var closeInput = document.getElementById("closedInput");
  var closeCards = document.getElementsByClassName("close");

  for( var i = 0; i < closeCards.length; i++) {
    closeCards[i].style.backgroundColor = closeInput.value;
  }
}