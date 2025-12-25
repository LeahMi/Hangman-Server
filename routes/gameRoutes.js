import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

let game = null;

router.post("/start", (req, res) => {
  game = new Game();
  console.log("Starting a game");
  res.json(game.getGameState());
});

router.get("/", (req, res) => {
  if (!game) {
    return res.status(400).json({ message: "No active game" });
  }
  res.json(game.getGameState());
});

router.post("/guess", (req, res) => {
  if (!game) {
    return res.status(400).json({ message: "No active game" });
  }

  let { letter } = req.body;

  if (!letter) {
    return res.status(400).json({ message: "Letter is required" });
  }

  if (!/^[a-z]$/i.test(letter)) {
    return res.status(400).json({ message: "Invalid letter" });
  }

  game.guessLetter(letter.toLowerCase());

  res.json(game.getGameState());
});

export default router;
