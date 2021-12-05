'use strict';
const BingoCard = require('./bingo-card');

module.exports = class BingoGame {

    constructor() { }

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        let lines = data.split(os.EOL);

        let numStrList = lines[0].split(',');
        let numbersToCall = [];
        for (let i = 0; i < numStrList.length; i++) {
            numbersToCall.push(parseInt(numStrList[i], 10));
        }
        this.numbersToCall = numbersToCall;

        let bingoCards = [];
        for (let i = 2; i < lines.length; i += 6) {
            bingoCards.push(new BingoCard(lines.slice(i, i+5)));
        }
        this.bingoCards = bingoCards;
    }

    runGameUntilWinnerFound() {
        this.numberIndex = 0;

        for (let i = 0; i < this.numbersToCall.length; i++) {

            const winningCardIndex = this.callNumberAndCheckForWinner(this.numbersToCall[i]);
            if (winningCardIndex >= 0) {
                this.winningCardIndex = winningCardIndex;
                return;
            }
        }
    }

    callNumberAndCheckForWinner(number) {
        for (let i = 0; i < this.bingoCards.length; i++) {
            const numberFound = this.bingoCards[i].markNumber(number);
            if (numberFound) {
                if (this.bingoCards[i].checkForWinner()) {
                    return i;
                }
            }
        }

        return -1;
    }

    getScoreOfWinningCard() {
        return this.bingoCards[this.winningCardIndex].calculateScoreOfCard();
    }

};