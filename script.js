const selections = ['rock', 'paper', 'scissors'];
const WINNING_SCORE = 3; //best 3 of 5
const GAME_WON = 'You Won!';
const GAME_LOST = 'You Lost!';

//runs full game
function game() {
  let userSelection;
  let computerSelection;
  let roundWinnerNumber;
  let userScore = 0;
  let computerScore = 0;
  while(userScore < WINNING_SCORE && computerScore < WINNING_SCORE) {
    userSelection = getUserChoice().toLowerCase();
    //validate user input
    if(!selections.includes(userSelection)){
      console.log('Invalid input. Exiting...');
      return null;
    } else {
      computerSelection = randomPlay();
      roundWinnerNumber = getRoundWinner(userSelection, computerSelection);
      if(roundWinnerNumber < 0) {
        userScore += 1;
      }
      if(roundWinnerNumber > 0) {
        computerScore += 1;
      }
      console.log(getRoundOutcome(roundWinnerNumber, userSelection, computerSelection));
    }
  }
  if(userScore == WINNING_SCORE){
    console.log(`${GAME_WON} (${userScore} to ${computerScore})`);
  } else {
    console.log(`${GAME_LOST} (${computerScore} to ${userScore})`);
  }
}

//returns outcome of round as string
function getRoundOutcome(roundWinnerNumber, userSelection, computerSelection) {
  //WIN
  if(roundWinnerNumber < 0) {
    return `round won (${userSelection} beats ${computerSelection})`;
  //TIE
  } else if(roundWinnerNumber === 0) {
    return `round tie (both played ${userSelection})`;
  //LOSS
  } else {
    return `round loss (${userSelection} loses to ${computerSelection})`;
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

//returns user typed prompt
function getUserChoice() {
  let input = window.prompt('Choose rock, paper, or scissors', '')
  return (input === null) ? '':input;
}

//returns random selection
function randomPlay() {
  return selections[Math.floor(Math.random()*selections.length)]
}

//executed code
game();