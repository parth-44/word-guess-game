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


