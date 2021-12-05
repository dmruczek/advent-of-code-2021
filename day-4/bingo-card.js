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

};