class Player{
    constructor({ name = null } = {}){
        this.id = crypto.randomUUID(),
        this.name = name;
        this.wins = 0;
        this.losses = 0;
    }

  recordWin() {
    this.wins++;
  }

  recordLoss() {
    this.losses++;
  }
}

module.exports = Player;