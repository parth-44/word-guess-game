// Selecting all required elements from the DOM
const inputs = document.querySelector(".inputs"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),      
  resetBtn = document.querySelector(".reset-btn"),
  typingInput = document.querySelector(".typing-input"),
  currScoreTag = document.querySelector(".curr-score span"),
  maxScoreTag = document.querySelector  (".max-score span");




// Variables for the game- state and configuration 
let word,
  maxGuesses,
  incorrectLetters = [],
  correctLetters = [],
  currScore = 0,
  maxScore = 0;



// This is the function that will be called when the user presses a key

function randomWord() {

  // Getting a random word and hint from the wordList array
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word.toLowerCase();
  maxGuesses = word.length >= 5 ? 8 : 6;

  // Resetting variables for a new game
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  // Creating input fields based on the length of the word
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}




// This functions is used to update the scores on the screen
function updateScores() {
  currScoreTag.innerText = currScore;
  maxScoreTag.innerText = maxScore;
}



// This is the function that will be called when the user types a letter
function initGame(e) {

  let key = e.target.value.toLowerCase();
  // Validating the input letter

  if (
    key.match (/^[A-Za-z]+$/) &&
    !incorrectLetters.includes(` ${key}`) &&
    !correctLetters.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correctLetters += key;
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    }  // If the letter is incorrect
    else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  // Checking the game status after a short delay 
  setTimeout(() => {               
    if (correctLetters.length === word.length) {
      currScore += 10; // +10 per word correct
      if (currScore > maxScore) maxScore = currScore;
      updateScores();

      // Alerting the user about success and choosing a new word
      alert(`🎉 Congrats! You found the word ${word.toUpperCase()}`);
      randomWord();
    } else if (maxGuesses < 1) {
      alert(`💀 Game over! The word was ${word.toUpperCase()}`);
      // filling the input fields with the correct word
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }

      currScore = 0; // reset score on failure
      updateScores();  // updating scores 
    }
  }, 100);  
}



// Event listeners for reset button and typing input
resetBtn.addEventListener("click", () => {
  currScore = 0;
  updateScores();
  randomWord();
});


// Event listener for typing input
typingInput.addEventListener("input", initGame);



// Focus on the typing input when the user clicks anywhere on the inputs or presses any key
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());



// Initialize the game on page load                  
randomWord();
updateScores();
