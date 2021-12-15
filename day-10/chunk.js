'use strict';

module.exports = class Chunk {

    constructor(chunkStr) {
        this.OPEN_CHARS = ['(', '[', '{', '<'];
        this.CLOSE_CHARS = [')', ']', '}', '>'];
        this.CHAR_SCORE = [1, 2, 3, 4];
        this.chunkStr = chunkStr;
    }

    getEndCharForGivenStartChar(startChar) {
        return this.CLOSE_CHARS[this.OPEN_CHARS.indexOf(startChar)];
    }

    /**
     * Assumes that the chunk has already been validated.
     */
    completePatternForValidChunk() {
        let openCharStack = [];

        for (let i = 0; i < this.chunkStr.length; i++) {
            const thisChar = this.chunkStr.charAt(i);

            if (this.OPEN_CHARS.includes(thisChar)) {
                openCharStack.push(thisChar);
            } else if (this.CLOSE_CHARS.includes(thisChar)) {
                openCharStack.pop();
            }
        }

        let remainingPattern = [];
        while (openCharStack.length > 0) {
            remainingPattern.push(this.getEndCharForGivenStartChar(openCharStack.pop()));
        }
        this.remainingPattern = remainingPattern;
    }

    getScore() {
        let score = 0;
        for (let i = 0; i < this.remainingPattern.length; i++) {
            const thisChar = this.remainingPattern[i];
            const scoreVal = this.CHAR_SCORE[this.CLOSE_CHARS.indexOf(thisChar)];
            score = (score * 5) + scoreVal;
        }
        return score;
    }

    isValid() {
        let openCharStack = [];

        for (let i = 0; i < this.chunkStr.length; i++) {
            const thisChar = this.chunkStr.charAt(i);

            if (this.OPEN_CHARS.includes(thisChar)) {
                openCharStack.push(thisChar);
            } else if (this.CLOSE_CHARS.includes(thisChar)) {
                if (thisChar != this.getEndCharForGivenStartChar(openCharStack.pop())) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
            }
        }

        return true;
    }

};