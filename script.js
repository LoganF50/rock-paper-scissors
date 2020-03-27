const selections = ['rock', 'paper', 'scissors'];
const WINNING_SCORE = 3; //best 3 of 5
const GAME_WON = 'You Won!';
const GAME_LOST = 'You Lost!';
const NEW_GAME_TEXT = 'Click your choice to play again.';

//returns outcome of round
function getRoundResults(roundWinnerNumber, userSelection, computerSelection) {
  //WIN
  if(roundWinnerNumber < 0) {
    return `Round won! (${userSelection} beats ${computerSelection})`;
  //TIE
  } else if(roundWinnerNumber === 0) {
    return `Round tie! (both played ${userSelection})`;
  //LOSS
  } else {
    return `Round loss! (${userSelection} loses to ${computerSelection})`;
  }
}

//returns <0 if player wins, 0 if tie, >0 if computer wins
function getRoundWinner(userSelection, computerSelection) {
  userSelection = userSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();
  //TIE
  if(userSelection === computerSelection) {
    return 0;
  //LOSS
  } else if(userSelection === 'rock' && computerSelection === 'paper' || userSelection === 'paper' && computerSelection === 'scissors' || userSelection === 'scissors' && computerSelection === 'rock') {
    return 1;
  //WIN
  } else {
    return -1;
  }
}

//handles playing of a single round when choice is clicked
function playRound(e) {
  //DOM elements used
  const userName = document.querySelector('#user-name');
  const userScore = document.querySelector('#user-score');
  const results = document.querySelector('#results');
  const computerName = document.querySelector('#computer-name');
  const computerScore = document.querySelector('#computer-score');

  //starting new game
  if(parseInt(userScore.innerHTML) >= WINNING_SCORE || parseInt(computerScore.innerHTML) >= WINNING_SCORE) {
    //reset scores before next round
    userScore.innerHTML = 0;
    computerScore.innerHTML = 0;
  }

  //play normal round (add +1 to winner)
  const userSelection = e.target.id;
  const computerSelection = randomPlay();
  const winnerNumber = getRoundWinner(userSelection, computerSelection);

  //TIE
  if(winnerNumber === 0) {
    results.innerHTML = getRoundResults(winnerNumber, userSelection, computerSelection);
  //WIN
  } else if(winnerNumber < 0) {
    userScore.innerHTML = parseInt(userScore.innerHTML) + 1;
    //check if game over
    if(parseInt(userScore.innerHTML) >= WINNING_SCORE) {
      results.innerHTML = GAME_WON;
    } else {
      results.innerHTML = getRoundResults(winnerNumber, userSelection, computerSelection);
    }
  //LOSS
  } else {
    computerScore.innerHTML = parseInt(computerScore.innerHTML) + 1;
    //check if game over
    if(parseInt(computerScore.innerHTML) >= WINNING_SCORE) {
      results.innerHTML = GAME_LOST;
    } else {
      results.innerHTML = getRoundResults(winnerNumber, userSelection, computerSelection);
    }
  }
}

//returns random selection
function randomPlay() {
  return selections[Math.floor(Math.random()*selections.length)]
}

//addEventListener for each clickable image
const choices = document.querySelectorAll('.choices-img');
choices.forEach((choice) =>
  choice.addEventListener('click', playRound)
);

document.querySelector('#results').innerHTML = `Click your choice to begin playing (best of ${WINNING_SCORE * 2 -1}).`;