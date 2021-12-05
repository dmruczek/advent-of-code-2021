const BingoGame = require('./bingo-game.js');
const bingoGame = new BingoGame();
bingoGame.loadInput('input.txt');
bingoGame.runGameSimulation();

console.log(bingoGame.getScoreOfLastPlaceCard());
