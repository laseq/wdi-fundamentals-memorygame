console.log("JS file is connected to HTML!")

//Variables for the game's logic
var cards = ['queen', 'queen', 'king', 'king'];
var cardsInPlay = [];
var score = 0;

var createCards = function(){
	//console.log("Entered function createCards");
	//Attach the game-board div from the HTML file to a variable here
	var gameBoard = document.getElementById('game-board');
	var newCardDiv = null;
	cards = shuffle(cards);

	//This for loop creates the 4 card divs and places them in the game-board div
	for (var i=0; i<cards.length; i++){
		//console.log("Entered the for loop. i = " + i);
		newCardDiv = document.createElement('div');
		newCardDiv.className = 'card';
		gameBoard.appendChild(newCardDiv);

		newCardDiv.setAttribute('data-card', cards[i]);
		newCardDiv.addEventListener("click", isTwoCards);
	}
}

var initialiseListeners = function(){
	var playAgainButton = document.getElementById('play-again');
	playAgainButton.addEventListener('click', playAgain);
}

//Checks to see if the cards in play are matching
var isMatch = function(cardsInPlayArray){
	//console.log("Entered isMatch function");
	if (cardsInPlayArray[0] == cardsInPlayArray[1]){
		console.log("Cards match - true");
		increaseScore();
		winMessage();
		//Shuffle the cards
		var shuffledCards = shuffle(cards);
		shuffleCards(shuffledCards);
		return true;
	} else{
		console.log("Cards don't match - false");
		loseMessage();
		return false;
	}
}

//This if to shuffle the cards after you match a pair
var shuffleCards = function(newCards){
	var cardElements = document.getElementsByClassName('card');
	for (var i=0; i<cards.length; i++){
		cardElements[i].setAttribute('data-card', newCards[i]);
	}
}

var isTwoCards = function(){
	//console.log("Entered isTwoCards function");
	//Gets the 'data-card' attribute value of the card that was clicked
	cardsInPlay.push(this.getAttribute('data-card'));
	setCardImage(this);
	//If you have 2 cards in play, check for a match
	if (cardsInPlay.length === 2){
		isMatch(cardsInPlay);
		//Clear cardsInPlay for your next try
		cardsInPlay = [];
		//clearCardImages();
		cardsUnclickable();
	} 
}

var setCardImage = function(theElement){
	//console.log("Entered setCardImage function");
	if (theElement.getAttribute('data-card')=='king'){
		theElement.innerHTML = '<img src="king-card.png" alt="King of Diamonds">';
		//console.log("Setting king image");
	} else if(theElement.getAttribute('data-card')=='queen'){
		theElement.innerHTML = '<img src="queen-card.png" alt="Queen of Flowers" />';
		//console.log("Setting queen image");
	} else{
		console.log("Couldn't get the image");
	}
}

var clearCardImages = function(){
	//console.log("Entered clearCardImages function");
	var cardElements = document.getElementsByClassName('card');
	for (var i=0; i<cardElements.length; i++){
		cardElements[i].innerHTML = "";
	}
}

/*var playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', playAgain);*/
var playAgain = function(){
	//console.log("Entered playAgain function");
	clearCardImages();
	cardsClickable();
	defaultMessage();
}

var cardsUnclickable = function(){
	console.log("Entered cardsUnclickable function");
	var cardElements = document.getElementsByClassName('card');
	for (var i=0; i<cardElements.length; i++){
		cardElements[i].removeEventListener('click', isTwoCards);
	}
}

var cardsClickable = function(){
	console.log("Entered cardsClickable function");
	var cardElements = document.getElementsByClassName('card');
	for (var i=0; i<cardElements.length; i++){
		cardElements[i].addEventListener('click', isTwoCards);
	}
}

var increaseScore = function(){
	//console.log("Entered increaseScore function");
	score += 1;
	var scoreElement = document.getElementById('score');
	scoreElement.innerHTML = score;
}

var winMessage = function(){
	console.log("Entered winMessage function");
	var message = document.getElementsByClassName('status')[0];
	message.textContent = "You've got a match!";
	message.className = 'status win-status';
}

var loseMessage = function(){
	console.log("Entered loseMessage function");
	var message = document.getElementsByClassName('status')[0];
	message.textContent = "No matches this time. Try again.";
	message.className = 'status lose-status';
}

var defaultMessage = function(){
	console.log("Entered defaultMessage function");
	var message = document.getElementsByClassName('status')[0];
	message.textContent = "Click on two cards to see if you've got a match";
	message.className = 'status';
}

//Fisher-Yates (aka Knuth) Shuffle
var shuffle = function(array) {
	console.log("Entered shuffle function");
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

createCards();
initialiseListeners();