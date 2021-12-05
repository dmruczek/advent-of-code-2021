'use strict';

module.exports = class BingoCard {

    constructor(bingoCardStrArray) {
        let bingoRows = [];

        for (let i = 0; i < bingoCardStrArray.length; i++) {
            const splitStr = bingoCardStrArray[i].trim().split(/\s+/);
            let numberList = [];
            for (let j = 0; j < splitStr.length; j++) {
                numberList.push(parseInt(splitStr[j]));
            }
            bingoRows.push(numberList);
        }
        this.bingoRows = bingoRows;

        this.markedRows = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
        ];
    }

    markNumber(numberToMark) {
        this.lastMarkedNumber = numberToMark;
        for (let i = 0; i < this.bingoRows.length; i++) {
            const thisRow = this.bingoRows[i];
            for (let j = 0; j < thisRow.length; j++) {
                if (thisRow[j] === numberToMark) {
                    this.markedRows[i][j] = true;
                    return true;
                }
            }
        }
        return false;
    }

    checkForWinner() {
        return this.checkRowsForWin(this.markedRows) || this.checkColumnsForWin(this.markedRows);
    }

    checkRowsForWin(markedRows) {
        for (let i = 0; i < 5; i++) {
            let winningRow = true;
            for (let j = 0; j < 5; j++) {
                winningRow = winningRow && markedRows[i][j];
            }
            if (winningRow) {
                return true;
            }
        }
        return false;
    }

    checkColumnsForWin(markedRows) {
        for (let i = 0; i < 5; i++) {
            let winningColumn = true;
            for (let j = 0; j < 5; j++) {
                winningColumn = winningColumn && markedRows[j][i];
            }
            if (winningColumn) {
                return true;
            }
        }
        return false;
    }

    calculateScoreOfCard() {
        let sumOfUnmarkedNumbers = 0;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (!this.markedRows[i][j]) {
                    sumOfUnmarkedNumbers += this.bingoRows[i][j];
                }
            }
        }
        return sumOfUnmarkedNumbers * this.lastMarkedNumber;
    }


};