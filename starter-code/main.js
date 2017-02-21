console.log("JS file is connected to HTML!")

//Variables for the game's logic
var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";

/*if (cardOne === cardThree){
	alert('You found a match.');
} else {
	alert("Sorry try again");
}*/

var createCards = function(){
	console.log("Entered function createCards")
	//Attach the game-board div from the HTML file to a variable here
	var gameBoard = document.getElementById('game-board');
	var newCardDiv = null;

	//This for loop creates the 4 card divs and places them in the game-board div
	for (var i=0; i<4; i++){
		console.log("Entered the for loop. i = " + i);
		newCardDiv = document.createElement('div');
		newCardDiv.className = 'card';
		gameBoard.appendChild(newCardDiv);
		console.log("Reached the end of the for loop");
	}
}

createCards();