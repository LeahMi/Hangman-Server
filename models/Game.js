import words from "../utils/words.js";

class Game {
  constructor() {
    this.word = this.getRandomWord();
    this.guessedLetters = [];
    this.wrongGuesses = 0;
    this.maxWrongGuesses = 6;
    this.status = "playing"; 
  }

  getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  guessLetter(letter) {
    if (this.status !== "playing") {
      return;
    }

    if (this.guessedLetters.includes(letter)) {
      return;
    }

    this.guessedLetters.push(letter);

    if (!this.word.includes(letter)) {
      this.wrongGuesses++;
    }

    const isWin = this.word
      .split("")
      .every(l => this.guessedLetters.includes(l));

    if (isWin) {
      this.status = "won";
      return;
    }

    if (this.wrongGuesses >= this.maxWrongGuesses) {
      this.status = "lost";
    }
  }
}

export default Game;
