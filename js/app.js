/*
 * Global variables
 */
var cardNames = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-anchor",
  "fa-leaf",
  "fa-bicycle",
  "fa-diamond",
  "fa-bomb",
  "fa-leaf",
  "fa-bomb",
  "fa-bolt",
  "fa-bicycle",
  "fa-paper-plane-o",
  "fa-cube"
];
var matchedBoxes = 0;
var firstSelection = null;
var secondSelection = null;
var time = null;
var timer = 0;

document.addEventListener("DOMContentLoaded", function() {
  reset();
});

/* After a click on a second card it was determined these cards do not match.
 * Flip the cards back over and reset the selections.  Increment
 * the number of moves
 */
function clearCards() {
  firstSelection.className = secondSelection.className = "card";
  firstSelection = secondSelection = null;
  addMove();
}

/*
 * We have a match.  Mark them as perm matches and increment the number of matched boxes
 * Check if all boxes have been matched.  If so. End game.
 */
function foundMatch() {
  firstSelection.className = secondSelection.className = "card match";
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
  var moves = document.querySelector(".moves").textContent;
  var stars = document.querySelector(".stars").children.length;
  $('#myModal').modal('show');
  var message = "You beat the puzzle in " +
      getTime() +
      ".\r\n It took " +
      moves +
      " turns to beat this puzzle and you earned " + stars + "stars.\r\n Try to beat your score!";

  var modalBody = document.querySelector(".modal-body").textContent = message;
}

//Main game loop
timer = setInterval(updateTime, 500);
document.querySelector(".deck").addEventListener("click", onClick);

// Main card click function for each card.
function onClick(event) {
  if (event.target.nodeName === "LI") {
    // display the card's symbol
    if (event.target.className !== "card open show") {
      event.target.className += " open show";
      // if this is the first card selection
      if (firstSelection === null) {
        firstSelection = event.target;
      } else if (
        firstSelection.firstElementChild.className !=
        event.target.firstElementChild.className
      ) {
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

document.querySelector(".btn-primary").addEventListener("click", function() {
  reset();
});

/*
 * Maintain the number of boxes that have been matched
 */
function updateNumberOfMatches() {
  matchedBoxes = document.querySelectorAll(".match").length;
}

/*
 * Reset the game
 */
function reset() {
  //get all cards from the DOM
  var cards = document.querySelectorAll(".card");
  //shuffle the cards
  cardNames = shuffle(cardNames);

  for (var i = 0; i < cards.length; i++) {
    cards[i].className = "card";
    cards[i].firstElementChild.className = "fa " + cardNames[i];
  }

  document.querySelector(".moves").textContent = 0;
  matchedBoxes = 0;
  firstSelection = secondSelection = null;

  //stop and restart the timer
  clearInterval(timer);
  time = 0;
  timer = setInterval(updateTime, 500);

  //reset stars
  resetStars();
}

document.querySelector(".restart").addEventListener("click", reset);

/*
 * Increment the number of moves variable
 */
function addMove() {
  var moves = document.querySelector(".moves");
  moves.textContent = parseInt(moves.textContent) + 1;
  if (
    moves.textContent === "12" ||
    moves.textContent === "20"
  ) {
    removeStar();
  }
}

/*
 * Time is calculated in half seconds.
 * Convert the time to a standard display timer
 * Hour:Minute:second
 */
function getTime() {
  var tmp = time / 2;
  var h = Math.trunc(tmp / 3600);
  var m = Math.trunc((tmp - h * 3600) / 60);
  var s = Math.trunc(tmp - m * 60 - h * 3600);
  return (
    h.toString().padStart(2, "0") +
    ":" +
    m.toString().padStart(2, "0") +
    ":" +
    s.toString().padStart(2, "0")
  );
}

function updateTime() {
  time += 1;
  document.querySelector(".timer").textContent = "Timer: " + getTime();
}

/*
 * Add stars if less than 3
 */
function resetStars() {
  var stars = document.querySelector(".stars");
  while (stars.children.length < 3) {
    var li = document.createElement("li");
    var i = '<i class="fa fa-star"></i>';
    li.insertAdjacentHTML("afterbegin", i);

    stars.appendChild(li);
  }
}

/*
 * Every 12 moves remove a star
 */
function removeStar() {
  var stars = document.querySelector(".stars");
  stars.removeChild(stars.children[0]);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
