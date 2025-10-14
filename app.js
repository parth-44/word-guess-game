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
  let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranItem.word.toLowerCase();
  maxGuesses = word.length >= 5 ? 8 : 6;
  correctLetters = [];
  incorrectLetters = [];
  hintTag.innerText = ranItem.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetter.innerText = incorrectLetters;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}



function updateScores() {
  currScoreTag.innerText = currScore;
  maxScoreTag.innerText = maxScore;
}




function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
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
    } else {
      maxGuesses--;
      incorrectLetters.push(` ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (correctLetters.length === word.length) {
      currScore += 10; // +10 per word correct
      if (currScore > maxScore) maxScore = currScore;
      updateScores();

      alert(`🎉 Congrats! You found the word ${word.toUpperCase()}`);
      randomWord();
    } else if (maxGuesses < 1) {
      alert(`💀 Game over! The word was ${word.toUpperCase()}`);
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }

      currScore = 0; // reset score on failure
      updateScores();
    }
  }, 100);
}

