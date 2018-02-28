/*
 * Create a list that holds all of your cards
 */
var cards = document.querySelectorAll('.card');
var firstSelection = null;
var secondSelection = null;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addMove(){
  var moves = document.querySelector('.moves');
  moves.textContent = parseInt(moves.textContent) + 1;
}

/* A click on a second card has determined these cards do not match.
 *  Flip the cards back over and reset the selections.  Increment
 * the number of moves
 */
function clearCards(){
  firstSelection.className = 'card';
  secondSelection.className = 'card';
  firstSelection = null;
  secondSelection = null;
  addMove();
}

function foundMatch(){
  firstSelection.className = 'card match';
  secondSelection.className = 'card match';
  firstSelection = null;
  secondSelection
  addMove();
}

// Click function for each card.
function onClick(event){
  if(event.target.nodeName === 'LI'){
    event.target.className += ' open show';
    if(firstSelection === null){
      firstSelection = event.target;
    }else if(firstSelection.firstElementChild.className != event.target.firstElementChild.className){
      secondSelection = event.target;
      tmout = setTimeout(clearCards, 1000);
    }else{
      secondSelection = event.target;
      foundMatch();
    }
  }
}

document.querySelector('.deck').addEventListener('click', onClick);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
