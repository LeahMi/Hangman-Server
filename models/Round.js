import words from "../utils/words.js";

class Round {
  constructor() {
    this.word = this.getRandomWord();
    this.guessedLetters = [];
    this.wrongGuesses = 0;
    this.maxWrongGuesses = 6;
    this.status = "playing"; 
  }

  getRandomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words[index];
  }

  guessLetter(letter) {
    if (this.status !== "playing") return;

    if (this.guessedLetters.includes(letter)) return;

    this.guessedLetters.push(letter);

    if (!this.word.includes(letter)) {
      this.wrongGuesses++;
    }

    if (this.isWon()) {
      this.status = "won";
    } else if (this.isLost()) {
      this.status = "lost";
    }
  }

  isWon() {
    return this.word
      .split("")
      .every(l => this.guessedLetters.includes(l));
  }

  isLost() {
    return this.wrongGuesses >= this.maxWrongGuesses;
  }

  getMaskedWord() {
    return this.word
      .split("")
      .map(l => (this.guessedLetters.includes(l) ? l : "_"))
      .join(" ");
  }
}

export default Round;
