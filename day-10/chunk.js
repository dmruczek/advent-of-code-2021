'use strict';

module.exports = class Chunk {

    constructor(chunkStr) {
        this.OPEN_CHARS = ['(', '[', '{', '<'];
        this.CLOSE_CHARS = [')', ']', '}', '>'];
        this.chunkStr = chunkStr;
    }

    getEndCharForGivenStartChar(startChar) {
        if (startChar === '(') {
            return ')';
        } else if (startChar === '[') {
            return ']';
        } else if (startChar === '{') {
            return '}';
        } else if (startChar === '<') {
            return '>';
        } else {
            return undefined;
        }
        
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