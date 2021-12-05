const BingoGame = require('./bingo-game.js');
const bingoGame = new BingoGame();
bingoGame.loadInput('input.txt');
bingoGame.runGameUntilWinnerFound();

console.log(bingoGame.getScoreOfWinningCard());
