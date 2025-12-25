import Round from "./Round.js";

class Game {
  constructor(mode = 1, players = []) {
    this.mode = mode; 
    this.players = players;
    this.currentPlayerIndex = 0;

    this.currentRound = new Round();
    this.roundsHistory = [];
    this.scoreboard = {};
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex] || "Player";
  }

  guessLetter(letter) {
    if (this.currentRound.status !== "playing") {
      return;
    }

    this.currentRound.guessLetter(letter);
  }

  endRound() {
    const player = this.getCurrentPlayer();

    if (!this.scoreboard[player]) {
      this.scoreboard[player] = 0;
    }

    if (this.currentRound.status === "won") {
      this.scoreboard[player]++;
    }

    this.roundsHistory.push({
      player,
      result: this.currentRound.status,
      word: this.currentRound.word,
    });

    if (this.mode === 2) {
      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }

    this.currentRound = new Round();
  }

  getGameState() {
    return {
      mode: this.mode,
      currentPlayer: this.getCurrentPlayer(),
      maskedWord: this.currentRound.getMaskedWord(),
      guessedLetters: this.currentRound.guessedLetters,
      wrongGuesses: this.currentRound.wrongGuesses,
      maxWrongGuesses: this.currentRound.maxWrongGuesses,
      status: this.currentRound.status,
      scoreboard: this.scoreboard,
      word:
        this.currentRound.status !== "playing"
          ? this.currentRound.word
          : undefined,
    };
  }
}

export default Game;
