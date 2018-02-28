/*
 * Create a list that holds all of your cards
 */
var cards = document.querySelectorAll('.card');
var cardNames = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
var matchedBoxes = 0;
var firstSelection = null;
var secondSelection = null;
var time = null;
var timer = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
document.querySelector('.restart').addEventListener('click', function(event) {
  var deck = document.querySelector('.deck');

  cardNames = shuffle(cardNames);

  for (var i = 0; i < cards.length; i++) {
    cards[i].className = 'card';
    cards[i].firstElementChild.className = 'fa ' + cardNames[i];

  }

  document.querySelector('.moves').textContent = 0;

  matchedBoxes = 0;
  firstSelection = secondSelection = null;
  time = 0;

});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * Maintain a number of boxes that have been matched
 */
function updateNumberOfMatches() {
  matchedBoxes = document.querySelectorAll('.match').length;
}

/*
 * Increment the number of moves variable
 */
function addMove() {
  var moves = document.querySelector('.moves');
  moves.textContent = parseInt(moves.textContent) + 1;
}

/* After a click on a second card it was determined these cards do not match.
 * Flip the cards back over and reset the selections.  Increment
 * the number of moves
 */
function clearCards() {
  firstSelection.className = 'card';
  secondSelection.className = 'card';
  firstSelection = secondSelection = null;
  addMove();
}

/*
 * We have a match.  Mark them as perm matches and increment the number of matched matchedBoxes
 * Check if all boxes have been matched.  If so. End game.
 */
function foundMatch() {
  firstSelection.className = 'card match';
  secondSelection.className = 'card match';
  firstSelection = secondSelection = null;
  addMove();
  updateNumberOfMatches();
  if (matchedBoxes === 16) {
    endGame();
  }
}

/*
 * The game has been won.  Now end it.
 */
function endGame() {
  clearInterval(timer);
  var moves = document.querySelector('.moves').textContent;
  alert("You win! It took you " + moves + " turns to beat this puzzle. Try to beat your score!");
}

// Click function for each card.
function onClick(event) {
  if (event.target.nodeName === 'LI') {
    // display the card's symbol
    if (event.target.className !== 'card open show') {
      event.target.className += ' open show';
      // if this is the first card selection
      if (firstSelection === null) {
        firstSelection = event.target;
      } else if (firstSelection.firstElementChild.className != event.target.firstElementChild.className) {
        // this is the second card selection and the two selections are not equal
        secondSelection = event.target;
        // Wait one second so the user can see the wrong match.  Then flip the cards back.
        setTimeout(clearCards, 300);
      } else {
        // correct selection
        secondSelection = event.target;
        foundMatch();
      }
    }
  }
}

function getTime () {
  var h = Math.trunc(time / 3600);
  var m = Math.trunc((time - (h * 60)) / 60);
  var s = Math.trunc((time - ((m * 60) - (h * 60))));
  return 'Timer: ' + h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
}

function updateTime () {
  time += 1;
  document.querySelector('.timer').textContent = getTime();
}

timer = setInterval(updateTime, 1000);
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
